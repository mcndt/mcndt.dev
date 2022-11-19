import { slugFromPath } from '$lib/util';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const modules = import.meta.glob('/content/posts/**/*.{md,svx,svelte.md}');

	let match: [string, () => Promise<unknown>] | undefined;
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = [path, resolver];
			break;
		}
	}

	if (!match) {
		throw error(404);
	}

	const post = await import(match[0]);
	const { title, date, tags } = post.metadata;
	const content = post.default;

	return {
		content,
		title,
		date,
		tags
	};
};
