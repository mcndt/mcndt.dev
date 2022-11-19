import type { PostMetadata } from '$lib/types/PostMetadata';
import { error } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

type Post = {
	metadata: PostMetadata;
	[key: string]: any;
};

export const load: LayoutLoad = async ({ url, fetch }) => {
	const post = (await fetch(`${url.pathname}.json`).then((res: Response) => res.json())) as Post;
	console.log('hello');
	if (!post || (post.draft && import.meta.env.PROD)) {
		throw error(404);
	}

	return { post };
};
