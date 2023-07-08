export const slugFromPath = (path: string) => {
	const slug = path.match(/([\w-]+)\.(svelte\.md|md|svx)/i)?.[1] ?? null;
	if (!slug) throw new Error(`Could not extract slug from path: ${path}`);
	return slug;
};
