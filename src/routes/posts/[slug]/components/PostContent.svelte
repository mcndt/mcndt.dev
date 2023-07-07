<script lang="ts">
	import AboutMeContent from '$lib/components/components/AboutMeContent.svelte';
	import Prose from '$lib/components/styling/Prose.svelte';

	export let title: string;
	export let date: string;
	export let tags: string[];
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

	<!-- <footer class="prose border-2 border-black p-4 dark:border-cream-300 dark:prose-invert">
		<h2>About me</h2>
		<p>
			I'm a computer science engineer with interest in a wide range of topics, including
			productivity, PKM, artificial intelligence, product development and game design.
			<br /><br />
			On my blog, you will find posts about personal projects, workflow and productivity, and reviews.
			Find out more about me <a style="box-shadow: 0 1px" href="/about">here</a>.
		</p>
	</footer> -->
</article>
