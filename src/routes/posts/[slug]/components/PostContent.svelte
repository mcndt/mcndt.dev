<script lang="ts">
	import AboutMeContent from '$lib/components/components/AboutMeContent.svelte';
	import Article from '$lib/components/styling/Article.svelte';
	import Card from '$lib/components/styling/Card.svelte';
	import Prose from '$lib/components/styling/Prose.svelte';
	import Tag from '$lib/components/styling/Tag.svelte';

	export let title: string;
	export let date: string;
	export let tags: string[];

	console.debug(tags);
</script>

<Article>
	<header class="mb-6 md:mb-8">
		<h2
			class="mb-3 mt-4 font-header text-4xl
      font-extrabold text-black dark:text-cream-700 md:text-5xl"
		>
			{title}
		</h2>
		<h3 class="text-sm text-stone-500">
			{date}
		</h3>
	</header>

	<Prose class="mb-12">
		<slot />
	</Prose>

	<div class="gap-y-1.6 mb-3 flex flex-wrap gap-x-1">
		{#each tags as tag}
			<Tag>{tag}</Tag>
		{/each}
	</div>

	<Card class="px-8 pt-6 pb-6">
		<footer
			class="prose-sm font-body
		dark:prose-invert"
		>
			<h2 class="font-header text-3xl font-bold">About me</h2>
			<AboutMeContent footer />
		</footer>
	</Card>
</Article>
