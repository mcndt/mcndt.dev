import { slugFromPath } from '$lib/util';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
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

	const response = {
		metadata: post.metadata,
		content: post.default
	};

	return new Response(JSON.stringify(response));
};
