<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import Timeline from '$lib/components/timeline.svelte';
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import type { PageData } from './$types';

	export let data: PageData;

	let { posts } = data;
</script>

<div class="relative mx-auto mb-16 mt-24 max-w-[720px]">
	<div
		class="absolute -left-4 -top-8 z-10 bg-[#1B1711] px-6 pt-4 pb-6 text-white
		drop-shadow-[8px_6px_0px_#FFD569] dark:text-cream-700 dark:drop-shadow-[8px_6px_0px_#F2BF3D] md:-left-8 
		lg:-left-12 lg:-top-10 lg:px-8 lg:pt-6 lg:pb-8"
	>
		<h2 class="lg:leading-12 font-header text-5xl font-bold leading-10 lg:text-[60px] ">
			Hello! I'm mcndt.
		</h2>
	</div>
	<div
		class="absolute -right-4 -bottom-8 z-10 h-[160px] w-[160px] rounded-full 
		border-[3px] border-black bg-[url(/profile-pic.jpg)] bg-cover px-6 pt-4
		pb-6 text-white drop-shadow-[8px_6px_0px_#452D82] md:-right-12"
	/>
	<div
		class="border-2 border-black bg-white pt-8 pb-8 pl-12 
		 drop-shadow-sharp dark:border-cream-500 dark:bg-neutral-900 dark:text-cream-700 
		 dark:drop-shadow-sharp-dark"
	>
		<div class="text-body mt-10 text-lg leading-8 text-stone-800 dark:text-cream-500 lg:mt-14">
			<p class="mb-8 pr-20">
				I’m a computer science engineer with interest in a wide range of topics, including
				productivity, PKM, artificial intelligence, product development and game design.
			</p>
			<p class="pr-36">
				On my blog, you will find posts about personal projects, workflow and productivity, and
				reviews. Find out more about me here.
			</p>
		</div>
	</div>
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
