import type { PostMetadata } from '$lib/types/PostMetadata';
import { slugFromPath } from '$lib/util';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const modules = import.meta.glob('/content/posts/**/*.{md,svx,svelte.md}');

	const postPromises = [];
	const limit = Number(url.searchParams.get('limit') ?? Infinity);

	if (Number.isNaN(limit)) {
		throw error(400, 'limit must be a number');
	}

	for (const [path, resolver] of Object.entries(modules)) {
		const slug = slugFromPath(path);
		const promise = resolver().then(
			(post: any) =>
				({
					slug,
					...post.metadata
				} as PostMetadata)
		);

		postPromises.push(promise);
	}

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts.filter((post) => !post.draft).slice(0, limit);
	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return new Response(JSON.stringify(publishedPosts), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
