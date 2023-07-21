import { slugFromPath } from '$lib/util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { MdsvexResolver } from '$lib/types/Mdsvex';
import type { PostMetadata } from '$lib/types/PostMetadata';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob('/content/posts/**/*.{md,svx,svelte.md}');

	let match: { path?: string; resolver?: MdsvexResolver } = {};
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, resolver: resolver as unknown as MdsvexResolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post || !!post.metadata.draft) {
		throw error(404);
	}

	return {
		title: post.metadata.title,
		component: post.default,
		frontmatter: post.metadata as unknown as PostMetadata
	};
};
