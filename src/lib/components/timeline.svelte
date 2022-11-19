<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import _ from 'lodash';

	export let posts: PostMetadata[] = [];

	let transformedPosts: PostMetadata[] = [];
	let postsLeft: PostMetadata[] = [];
	let postsRight: PostMetadata[] = [];

	$: transformedPosts = _(posts)
		.sortBy('date')
		.reverse()
		.map((post) => ({
			...post,
			date: new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })
		}))
		.value();

	// TODO: this can probably be refactored to a zero-JS solution using CSS grid or smth?
	$: postsLeft = transformedPosts.filter((_, i) => i % 2 === 0);
	$: postsRight = transformedPosts.filter((_, i) => i % 2 === 1);
</script>

<div class="flex w-full lg:space-x-8">
	<div class="flex hidden w-1/2 grow flex-col space-y-8 sm:space-y-12 lg:block">
		{#each postsLeft as post}
			<Card
				tickLocation="right"
				title={post.title}
				date={post.date}
				summary={post.summary}
				tags={post.tags}
				href={`/posts/${post.slug}`}
			/>
		{/each}
	</div>
	<div
		class="mt-8 mr-8 hidden grow-0 border-r-4 border-black dark:border-cream-500 sm:block lg:mt-6 lg:mr-0"
	/>
	<div class="flex w-1/2 grow flex-col space-y-8 sm:space-y-12 lg:mt-32">
		{#each postsRight as post}
			<Card
				tickLocation="left"
				title={post.title}
				date={post.date}
				summary={post.summary}
				tags={post.tags}
				href={`/posts/${post.slug}`}
			/>
		{/each}
	</div>
</div>
