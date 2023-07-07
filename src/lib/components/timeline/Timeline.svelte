<script lang="ts">
	import TimelineItem from '$lib/components/timeline/TimelineItem.svelte';
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
	<!-- This contentless div becomes the 'timeline line'. The tickmarks
	on the timeline are added by the <TimelineItem /> components. -->
	<div
		class="mr-[30px] hidden 
		grow-0 border-r-4 border-black
		dark:border-cream-500 sm:block lg:absolute 
		lg:left-[calc(50%-2px)] lg:ml-0 lg:h-full
		"
	>
		<!-- The top of the timeline line should have a little inverted triangle on it. -->
		<div class="timeline" />
	</div>
	<!-- The "grid" view only gets two columns when the page is wide enough. -->
	<div class="grid w-full gap-x-16 gap-y-8 lg:grid-cols-2 lg:gap-y-12">
		{#each transformedPosts as post, i}
			{#if i === 1}
				<!-- We add a hidden element in the right column 
				so that the cards in each column appear staggered. Only
				visible when the timeline takes two columns. -->
				<div class="hidden h-16 lg:block" />
			{/if}
			<div class="row-span-2">
				<TimelineItem
					tickLocation={i % 2 === 0 ? 'right' : 'left'}
					title={post.title}
					date={post.date}
					summary={post.summary}
					tags={post.tags}
					href={`/posts/${post.slug}`}
					tickIndex={i}
				/>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	:global(.dark) {
		.timeline {
			--cap-color: #d5cdbb; // cream-500
		}
	}

	.timeline {
		--cap-size: 10px;
		--cap-color: black;

		position: relative;
		height: 100%;

		&:before {
			content: '';

			position: absolute;
			top: 0px;
			left: calc(-1 * var(--cap-size) + 2px); // 2px is half the width of the timeline line

			width: 0;
			height: 0;
			border-left: var(--cap-size) solid transparent;
			border-right: var(--cap-size) solid transparent;
			border-top: var(--cap-size) solid var(--cap-color);
		}

		&:after {
			content: '';

			position: absolute;
			bottom: 0px;
			left: calc(-1 * var(--cap-size) + 2px); // 2px is half the width of the timeline line

			width: 0;
			height: 0;
			border-left: var(--cap-size) solid transparent;
			border-right: var(--cap-size) solid transparent;
			border-bottom: var(--cap-size) solid var(--cap-color);
		}
	}
</style>
