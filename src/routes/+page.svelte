<script lang="ts">
	import AboutMe from '$lib/components/AboutMe.svelte';
	import Card from '$lib/components/timeline/TimelineItem.svelte';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import type { PageData } from './$types';
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import Dotted from '$lib/components/styling/DottedBg.svelte';

	export let data: PageData;

	let { posts } = data;
</script>

<PageContent>
	<div class="relative mx-auto mb-16 mt-16 max-w-[720px]">
		<AboutMe />
	</div>

	<div class="mb-8 flex gap-x-1">
		<button
			class="box-border h-8 rounded-full border-[3px] border-black bg-white px-3 pb-1 
			align-middle font-header text-xl leading-5 text-black hover:underline dark:border-cream-700 dark:bg-neutral-900 dark:text-cream-700"
			>All</button
		>
		{#each ['Articles', 'Talks', 'Showcase'] as text}
			<button
				class="box-border h-8 rounded-full bg-black px-3 pb-1 align-middle 
			font-header text-xl leading-5 text-white hover:underline dark:bg-cream-700 dark:text-black"
				>{text}</button
			>
		{/each}
	</div>

	<div class="pb-12">
		<Timeline {posts} />
	</div>
</PageContent>
