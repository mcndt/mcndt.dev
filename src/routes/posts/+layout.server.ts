import type { PostMetadata } from '$lib/types/PostMetadata';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

type Post = {
	metadata: PostMetadata;
	[key: string]: any;
};

export const load: LayoutServerLoad = async ({ url, fetch }) => {
	const post = (await fetch(`${url.pathname}.json`).then((res: Response) => res.json())) as Post;
	if (!post || (post.draft && import.meta.env.PROD)) {
		throw error(404);
	}

	return { post };
};
