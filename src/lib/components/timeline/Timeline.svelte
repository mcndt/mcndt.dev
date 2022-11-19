<script lang="ts">
	import Card from '$lib/components/timeline/TimelineItem.svelte';
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import _ from 'lodash';

	export let posts: PostMetadata[] = [];

	const transformedPosts = _(posts)
		.sortBy('date')
		.reverse()
		.map((post) => ({
			...post,
			date: new Date(post.date).toLocaleDateString('en-US', { dateStyle: 'long' })
		}))
		.value();
</script>

<div class="flex w-full lg:relative lg:block">
	<div
		class="mr-[30px] hidden grow-0 border-r-4 border-black bg-yellow-400 
		dark:border-cream-500 sm:block lg:absolute 
		lg:left-[calc(50%-2px)] lg:ml-0 lg:h-full 
		"
	/>
	<div class="grid w-full gap-x-16 gap-y-8 lg:grid-cols-2 lg:gap-y-12">
		{#each transformedPosts as post, i}
			{#if i === 1}
				<div class="hidden h-16 lg:block" />
			{/if}
			<div class="row-span-2">
				<Card
					tickLocation={i % 2 === 0 ? 'right' : 'left'}
					title={post.title}
					date={post.date}
					summary={post.summary}
					tags={post.tags}
					href={`/posts/${post.slug}`}
				/>
			</div>
		{/each}
	</div>
</div>
