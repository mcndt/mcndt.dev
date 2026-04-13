// import remarkGithub from 'remark-github';
// import remarkAbbr from 'remark-abbr';
import remarkFootnotes from 'remark-footnotes';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import relativeImages from 'mdsvex-relative-images';

export default {
	extensions: ['.svelte.md', '.md', '.svx'],
	smartypants: {
		dashes: 'oldschool'
	},
	remarkPlugins: [
		[
			relativeImages,
			// remarkGithub,
			{
				// Use your own repository
				// repository: 'https://github.com/mvasigh/sveltekit-mdsvex-blog.git'
			}
		],
		[remarkFootnotes, { inlineNotes: true }]
		// remarkAbbr
	],
	rehypePlugins: [
		rehypeSlug,
		[
			rehypeAutolinkHeadings,
			{
				behavior: 'wrap'
			}
		]
	]
};
