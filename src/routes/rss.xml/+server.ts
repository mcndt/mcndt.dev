import { SITE_TITLE, SITE_URL } from '$lib/siteConfig';

import RSS from 'rss';

import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import type { PostMetadata } from '$lib/types/PostMetadata';

export const prerender = true;

export const GET: RequestHandler = async ({ fetch }) => {
	const response = await fetch('/posts/index.json');

	if (!response.ok) {
		throw error(response.status, response.statusText);
	}

	const posts = (await response.json()) as PostMetadata[];

	// inspo: https://github.com/swyxio/swyxkit/blob/6e8f840a5d912364d451526250fe2c371adcb9f3/src/routes/rss.xml/%2Bserver.js
	const feed = new RSS({
		title: SITE_TITLE + ' RSS Feed',
		site_url: SITE_URL,
		feed_url: SITE_URL + '/rss.xml'
	});

	posts.forEach((post) => {
		feed.item({
			title: post.title,
			url: SITE_URL + `/posts/${post.slug}`,
			date: post.date,
			description: post.summary
		});
	});

	return new Response(feed.xml({ indent: true }), {
		headers: {
			'Cache-Control': `public, max-age=${86400}`, // 24 hours
			'Content-Type': 'application/rss+xml'
		}
	});
};
