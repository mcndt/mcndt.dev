<script lang="ts">
	import AboutMeContent from '$lib/components/components/AboutMeContent.svelte';
	import Prose from '$lib/components/styling/Prose.svelte';

	export let title: string;
	export let date: string;
	export let tags: string[];

	console.debug(tags);
</script>

<article class=" mx-auto max-w-[720px] font-body dark:text-cream-400">
	<header class="mb-6 md:mb-8">
		<h2
			class="mb-3 font-header text-4xl font-extrabold
      text-black dark:text-cream-700 md:text-5xl"
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

	<footer
		class="prose-sm border-2 border-black bg-white px-8 pt-6 pb-6 font-body
				shadow-sharp dark:border-cream-300 dark:bg-neutral-900 dark:prose-invert"
	>
		<h2 class="font-header text-3xl font-bold">About me</h2>
		<AboutMeContent footer />
	</footer>
</article>
