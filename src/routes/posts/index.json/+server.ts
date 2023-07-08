import type { PostMetadata } from '$lib/types/PostMetadata';
import { slugFromPath } from '$lib/util';
import type { RequestHandler } from './$types';

export const prerender = true;

type Post = {
	metadata: Omit<PostMetadata, 'slug'>;
};

export const GET: RequestHandler = async () => {
	const allPostFiles: Record<string, Post> = import.meta.glob(
		'/content/posts/**/*.{md,svx,svelte.md}',
		{ eager: true }
	);

	const posts: PostMetadata[] = Object.entries(allPostFiles).map(([path, post]) => ({
		slug: slugFromPath(path),
		...post.metadata
	}));

	const publishedPosts = posts.filter((post) => !post.draft);
	publishedPosts.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return new Response(JSON.stringify(publishedPosts), {
		headers: {
			'Content-Type': 'application/json'
		}
	});
};
