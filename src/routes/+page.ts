import type { PostMetadata } from '$lib/types/PostMetadata';
import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const prerender = true;

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch('/posts/index.json');

	if (res.ok) {
		const posts = (await res.json()) as PostMetadata[];
		return { posts };
	}

	throw error(res.status, res.statusText);
};
