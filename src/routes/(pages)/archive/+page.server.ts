import type { PostMetadata } from '$lib/types/PostMetadata';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const prerender = true;

export const load: PageServerLoad = async ({ fetch }) => {
	const res = await fetch('/posts/index.json');

	if (res.ok) {
		const posts = (await res.json()) as PostMetadata[];
		return { posts, title: 'Archive' };
	}

	throw error(res.status, res.statusText);
};
