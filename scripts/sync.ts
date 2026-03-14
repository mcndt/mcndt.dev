import { readFileSync, writeFileSync, existsSync, readdirSync, statSync, mkdirSync, unlinkSync, rmSync } from 'fs';
import { join, relative, extname, basename, dirname } from 'path';
import { createHash } from 'crypto';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface SyncConfig {
  vaultPath: string;
  mappings: { tag: string; output: string }[];
}

interface SyncLock {
  files: string[];
}

interface ObsidianFrontmatter {
  slug: string;
  date: string;
  draft: boolean;
  summary: string;
  tags: string[];
  'blog tags': string[];
  [key: string]: unknown;
}

interface DiscoveredNote {
  filePath: string;
  frontmatter: ObsidianFrontmatter;
  matchedTag: string;
  outputDir: string;
}

interface SyncSummary {
  added: string[];
  updated: string[];
  removed: string[];
  imagesAdded: string[];
  imagesRemoved: string[];
}

// ---------------------------------------------------------------------------
// Config & lock
// ---------------------------------------------------------------------------

const ROOT = join(__dirname, '..');

function loadConfig(): SyncConfig {
  const configPath = join(ROOT, '.sync.config.json');
  if (!existsSync(configPath)) {
    console.error('Missing .sync.config.json — see plans/sync-tool.md for the schema.');
    process.exit(1);
  }
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

function loadLock(): SyncLock {
  const lockPath = join(ROOT, '.sync-lock.json');
  if (!existsSync(lockPath)) return { files: [] };
  return JSON.parse(readFileSync(lockPath, 'utf-8'));
}

function saveLock(lock: SyncLock): void {
  writeFileSync(join(ROOT, '.sync-lock.json'), JSON.stringify(lock, null, 2) + '\n');
}

// ---------------------------------------------------------------------------
// Vault scanner
// ---------------------------------------------------------------------------

function walkDir(dir: string): string[] {
  const results: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip hidden dirs and common non-content dirs
      if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
      results.push(...walkDir(full));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      results.push(full);
    }
  }
  return results;
}

/**
 * Parse only the YAML frontmatter from a markdown file (up to closing ---).
 * Returns null if no valid frontmatter found.
 */
function parseFrontmatter(filePath: string): ObsidianFrontmatter | null {
  const content = readFileSync(filePath, 'utf-8');
  if (!content.startsWith('---')) return null;

  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) return null;

  const yamlBlock = content.slice(4, endIdx);
  return parseSimpleYaml(yamlBlock);
}

/**
 * Simple YAML parser for frontmatter — handles the fields we care about.
 * Avoids pulling in a full YAML library.
 */
function parseSimpleYaml(yaml: string): ObsidianFrontmatter {
  const result: Record<string, unknown> = {};
  const lines = yaml.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const match = line.match(/^([\w\s]+?):\s*(.*)/);
    if (!match) continue;

    const key = match[1].trim();
    let value: unknown = match[2].trim();

    // Handle arrays: either inline [...] or multi-line - items
    if (typeof value === 'string' && value.startsWith('[')) {
      // Inline array like ["foo", "bar"] or [foo, bar]
      const inner = (value as string).slice(1, -1);
      result[key] = inner
        ? inner.split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''))
        : [];
      continue;
    }

    // Multi-line array
    if (value === '') {
      const arr: string[] = [];
      while (i + 1 < lines.length && lines[i + 1].match(/^\s*-\s/)) {
        i++;
        arr.push(lines[i].replace(/^\s*-\s*/, '').replace(/^["']|["']$/g, '').trim());
      }
      if (arr.length > 0) {
        result[key] = arr;
        continue;
      }
    }

    // Handle booleans
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Strip quotes
    else if (typeof value === 'string') {
      value = (value as string).replace(/^["']|["']$/g, '');
    }

    result[key] = value;
  }

  return result as unknown as ObsidianFrontmatter;
}

/**
 * Scan the vault for notes matching any configured tag prefix.
 * Returns most-specific tag match (longest prefix).
 */
function scanVault(config: SyncConfig): DiscoveredNote[] {
  const allMdFiles = walkDir(config.vaultPath);
  const notes: DiscoveredNote[] = [];

  // Sort mappings by tag length descending (most-specific first)
  const sortedMappings = [...config.mappings].sort((a, b) => b.tag.length - a.tag.length);

  for (const filePath of allMdFiles) {
    const fm = parseFrontmatter(filePath);
    if (!fm || !fm.tags || !Array.isArray(fm.tags)) continue;

    // Find the most-specific matching tag
    for (const mapping of sortedMappings) {
      const matchingTag = fm.tags.find(
        (t) => t === mapping.tag || t.startsWith(mapping.tag + '/')
      );
      if (matchingTag) {
        if (!fm.slug) {
          console.warn(`⚠ Skipping ${filePath}: missing slug in frontmatter`);
          break;
        }
        notes.push({
          filePath,
          frontmatter: fm,
          matchedTag: matchingTag,
          outputDir: mapping.output,
        });
        break; // first match wins (most-specific due to sort)
      }
    }
  }

  return notes;
}

// ---------------------------------------------------------------------------
// Content transformations
// ---------------------------------------------------------------------------

function readFullContent(filePath: string): string {
  return readFileSync(filePath, 'utf-8');
}

/** Extract H1 from body content (first # heading) */
function extractH1(body: string): { title: string; bodyWithoutH1: string } {
  const match = body.match(/^#\s+(.+)$/m);
  if (!match) return { title: '', bodyWithoutH1: body };

  const title = match[1].trim();
  const bodyWithoutH1 = body.slice(0, match.index) + body.slice(match.index! + match[0].length);
  return { title, bodyWithoutH1 };
}

/** Strip the YAML frontmatter block from raw content, returning just the body */
function stripFrontmatter(content: string): string {
  if (!content.startsWith('---')) return content;
  const endIdx = content.indexOf('\n---', 3);
  if (endIdx === -1) return content;
  return content.slice(endIdx + 4).trim();
}

/** Strip Obsidian-only code blocks (meta-bind-button, dataview, etc.) */
function stripObsidianBlocks(body: string): string {
  // Remove ```meta-bind-button ... ``` and ```dataview ... ``` blocks
  return body.replace(/```(?:meta-bind-button|meta-bind|dataview|dataviewjs)\n[\s\S]*?```/g, '');
}

interface ImageEmbed {
  fullMatch: string;
  filename: string;
  altText: string;
  caption: string | null; // from *italics* line immediately after
}

/** Find all Obsidian image embeds: ![[image.png|Alt text]] with optional caption */
function findImageEmbeds(body: string): ImageEmbed[] {
  const embeds: ImageEmbed[] = [];
  const lines = body.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^!\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]\s*$/);
    if (!match) continue;

    const filename = match[1].trim();
    // Only process image files
    const imgExts = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.bmp'];
    if (!imgExts.some((ext) => filename.toLowerCase().endsWith(ext))) continue;

    const altText = match[2]?.trim() || '';

    // Check for caption on next line: *caption text*
    let caption: string | null = null;
    let fullMatch = lines[i];
    if (i + 1 < lines.length) {
      const captionMatch = lines[i + 1].match(/^\*([^*]+)\*\s*$/);
      if (captionMatch) {
        caption = captionMatch[1].trim();
        fullMatch += '\n' + lines[i + 1];
      }
    }

    embeds.push({ fullMatch, filename, altText, caption });
  }

  return embeds;
}

/** Convert image embeds to Figure components and collect image paths */
function convertImageEmbeds(
  body: string,
  slug: string,
  embeds: ImageEmbed[]
): { body: string; imageFiles: string[] } {
  let result = body;
  const imageFiles: string[] = [];

  for (const embed of embeds) {
    const outFilename = replaceExtWithWebp(embed.filename);
    imageFiles.push(embed.filename);

    const props: string[] = [`src="./media/${slug}/${outFilename}"`];
    if (embed.altText) props.push(`title="${escapeAttr(embed.altText)}"`);
    if (embed.caption) props.push(`caption="${escapeAttr(embed.caption)}"`);

    const figureTag = `<Figure ${props.join(' ')} />`;
    result = result.replace(embed.fullMatch, figureTag);
  }

  return { body: result, imageFiles };
}

function replaceExtWithWebp(filename: string): string {
  const ext = extname(filename);
  if (ext.toLowerCase() === '.svg') return filename; // keep SVG as-is
  return filename.slice(0, -ext.length) + '.webp';
}

function escapeAttr(s: string): string {
  return s.replace(/"/g, '&quot;');
}

/**
 * Resolve wikilinks:
 * - [[Note Name]] or [[Note Name|display text]]
 * - If target is a published blog post → [display](/posts/{slug})
 * - Otherwise → plain text
 */
function resolveWikilinks(body: string, publishedSlugs: Map<string, string>): string {
  return body.replace(/\[\[([^\]|]+?)(?:\|([^\]]*))?\]\]/g, (_match, target, display) => {
    const displayText = (display || target).trim();
    const targetName = target.trim();

    // Check if this target matches a published note name
    const slug = publishedSlugs.get(targetName.toLowerCase());
    if (slug) {
      return `[${displayText}](/posts/${slug})`;
    }

    return displayText;
  });
}

/** Build blog-compatible frontmatter */
function buildBlogFrontmatter(fm: ObsidianFrontmatter, title: string): string {
  const blogTags = fm['blog tags'] || [];
  const lines = [
    '---',
    `title: ${yamlString(title)}`,
    `slug: ${yamlString(fm.slug)}`,
    `date: ${yamlString(String(fm.date))}`,
    `draft: ${fm.draft}`,
    `summary: ${yamlString(fm.summary || '')}`,
    `tags: [${blogTags.map((t) => yamlString(t)).join(', ')}]`,
    '---',
  ];
  return lines.join('\n');
}

function yamlString(s: string): string {
  if (/[:#\[\]{}&*!|>'"%@`]/.test(s) || s.includes("'") || s === '' || s === 'true' || s === 'false') {
    return `'${s.replace(/'/g, "''")}'`;
  }
  return s;
}

/** Add <script context="module"> import for Figure if images are present */
function addFigureImport(hasImages: boolean): string {
  if (!hasImages) return '';
  return `\n<script context="module">\n\timport Figure from "$lib/components/components/Figure.svelte"\n</script>\n`;
}

// ---------------------------------------------------------------------------
// Image pipeline
// ---------------------------------------------------------------------------

function fileHash(filePath: string): string {
  const data = readFileSync(filePath);
  return createHash('sha256').update(data).digest('hex').slice(0, 16);
}

/** Find the source image in the vault (Obsidian can store images anywhere) */
function findImageInVault(vaultPath: string, filename: string): string | null {
  // Search the vault for the image file
  const search = (dir: string): string | null => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) {
        if (entry.name.startsWith('.') || entry.name === 'node_modules') continue;
        const found = search(join(dir, entry.name));
        if (found) return found;
      } else if (entry.name === filename) {
        return join(dir, entry.name);
      }
    }
    return null;
  };
  return search(vaultPath);
}

/** Optimize and copy an image to the output media directory */
async function optimizeImage(
  sourcePath: string,
  outputPath: string
): Promise<void> {
  mkdirSync(dirname(outputPath), { recursive: true });

  const ext = extname(sourcePath).toLowerCase();

  if (ext === '.svg') {
    // SVG: just copy as-is
    writeFileSync(outputPath, readFileSync(sourcePath));
    return;
  }

  // Convert to WebP with sharp
  await sharp(sourcePath)
    .resize({ width: 1600, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath);
}

// ---------------------------------------------------------------------------
// Image hash cache — avoids re-optimizing unchanged images
// ---------------------------------------------------------------------------

interface ImageHashCache {
  [outputPath: string]: string; // source file hash
}

function loadImageHashCache(): ImageHashCache {
  const cachePath = join(ROOT, '.sync-image-cache.json');
  if (!existsSync(cachePath)) return {};
  return JSON.parse(readFileSync(cachePath, 'utf-8'));
}

function saveImageHashCache(cache: ImageHashCache): void {
  writeFileSync(join(ROOT, '.sync-image-cache.json'), JSON.stringify(cache, null, 2) + '\n');
}

// ---------------------------------------------------------------------------
// Main sync
// ---------------------------------------------------------------------------

async function main() {
  const config = loadConfig();
  const lock = loadLock();
  const imageCache = loadImageHashCache();
  const summary: SyncSummary = {
    added: [],
    updated: [],
    removed: [],
    imagesAdded: [],
    imagesRemoved: [],
  };

  console.log('Scanning vault...');
  const notes = scanVault(config);
  console.log(`Found ${notes.length} note(s) matching configured tags.`);

  // Build lookup: note name (lowercase) → slug for published notes (for wikilink resolution)
  const publishedSlugs = new Map<string, string>();
  for (const note of notes) {
    if (!note.frontmatter.draft) {
      const noteName = basename(note.filePath, '.md');
      publishedSlugs.set(noteName.toLowerCase(), note.frontmatter.slug);
    }
  }

  const newLockFiles: string[] = [];
  const newImageCache: ImageHashCache = {};

  // Process published notes
  for (const note of notes) {
    if (note.frontmatter.draft) continue;

    const slug = note.frontmatter.slug;
    const outputFilename = `${slug}.svelte.md`;
    const outputRelPath = join(note.outputDir, outputFilename);
    const outputAbsPath = join(ROOT, outputRelPath);

    // Read full content and transform
    const rawContent = readFullContent(note.filePath);
    const body = stripFrontmatter(rawContent);
    const { title, bodyWithoutH1 } = extractH1(body);

    if (!title) {
      console.warn(`⚠ Skipping ${note.filePath}: no H1 heading found`);
      continue;
    }

    // Transform body
    let transformedBody = stripObsidianBlocks(bodyWithoutH1);
    const imageEmbeds = findImageEmbeds(transformedBody);
    const { body: bodyWithFigures, imageFiles } = convertImageEmbeds(
      transformedBody,
      slug,
      imageEmbeds
    );
    transformedBody = resolveWikilinks(bodyWithFigures, publishedSlugs);

    // Trim leading/trailing whitespace
    transformedBody = transformedBody.trim();

    // Build output
    const frontmatter = buildBlogFrontmatter(note.frontmatter, title);
    const figureImport = addFigureImport(imageFiles.length > 0);
    const output = frontmatter + figureImport + '\n' + transformedBody + '\n';

    // Write output file
    mkdirSync(dirname(outputAbsPath), { recursive: true });

    const isNew = !existsSync(outputAbsPath);
    const isChanged = !isNew && readFileSync(outputAbsPath, 'utf-8') !== output;

    if (isNew || isChanged) {
      writeFileSync(outputAbsPath, output);
      if (isNew) {
        summary.added.push(outputRelPath);
      } else {
        summary.updated.push(outputRelPath);
      }
    }

    newLockFiles.push(outputRelPath);

    // Process images
    for (const imgFilename of imageFiles) {
      const sourcePath = findImageInVault(config.vaultPath, imgFilename);
      if (!sourcePath) {
        console.warn(`⚠ Image not found in vault: ${imgFilename}`);
        continue;
      }

      const outFilename = replaceExtWithWebp(imgFilename);
      const mediaDir = join(note.outputDir, 'media', slug);
      const mediaRelPath = join(mediaDir, outFilename);
      const mediaAbsPath = join(ROOT, mediaRelPath);

      // Hash-based caching
      const srcHash = fileHash(sourcePath);
      const cachedHash = imageCache[mediaRelPath];

      if (cachedHash === srcHash && existsSync(mediaAbsPath)) {
        // Image unchanged, skip
        newImageCache[mediaRelPath] = srcHash;
      } else {
        await optimizeImage(sourcePath, mediaAbsPath);
        newImageCache[mediaRelPath] = srcHash;
        summary.imagesAdded.push(mediaRelPath);
      }

      newLockFiles.push(mediaRelPath);
    }
  }

  // Remove orphaned files (in old lock but not in new lock)
  const newLockSet = new Set(newLockFiles);
  for (const oldFile of lock.files) {
    if (!newLockSet.has(oldFile)) {
      const absPath = join(ROOT, oldFile);
      if (existsSync(absPath)) {
        unlinkSync(absPath);
        if (oldFile.includes('/media/')) {
          summary.imagesRemoved.push(oldFile);
        } else {
          summary.removed.push(oldFile);
        }

        // Clean up empty media directories
        const dir = dirname(absPath);
        try {
          if (readdirSync(dir).length === 0) rmSync(dir, { recursive: true });
        } catch {
          // ignore
        }
      }
    }
  }

  // Save lock and cache
  saveLock({ files: newLockFiles.sort() });
  saveImageHashCache(newImageCache);

  // Print summary
  printSummary(summary);
}

function printSummary(summary: SyncSummary) {
  const total =
    summary.added.length +
    summary.updated.length +
    summary.removed.length +
    summary.imagesAdded.length +
    summary.imagesRemoved.length;

  if (total === 0) {
    console.log('\n✓ Everything up to date.');
    return;
  }

  console.log('\n--- Sync Summary ---');

  if (summary.added.length > 0) {
    console.log(`\n+ ${summary.added.length} post(s) added:`);
    summary.added.forEach((f) => console.log(`  ${f}`));
  }
  if (summary.updated.length > 0) {
    console.log(`\n~ ${summary.updated.length} post(s) updated:`);
    summary.updated.forEach((f) => console.log(`  ${f}`));
  }
  if (summary.removed.length > 0) {
    console.log(`\n- ${summary.removed.length} post(s) removed:`);
    summary.removed.forEach((f) => console.log(`  ${f}`));
  }
  if (summary.imagesAdded.length > 0) {
    console.log(`\n+ ${summary.imagesAdded.length} image(s) added/updated:`);
    summary.imagesAdded.forEach((f) => console.log(`  ${f}`));
  }
  if (summary.imagesRemoved.length > 0) {
    console.log(`\n- ${summary.imagesRemoved.length} image(s) removed:`);
    summary.imagesRemoved.forEach((f) => console.log(`  ${f}`));
  }

  console.log('\nPush to deploy these changes.');
}

main().catch((err) => {
  console.error('Sync failed:', err);
  process.exit(1);
});
