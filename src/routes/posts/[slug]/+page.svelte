<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<article class="prose prose-stone mx-auto font-body dark:prose-invert dark:text-cream-400">
	<div class="not-prose">
		<h1 class="mb-2 font-header text-4xl font-black text-black dark:text-cream-700">
			{data.title}
		</h1>
		<p class="text-sm text-cream-200">
			{new Date(data.date).toLocaleDateString('en-US', { dateStyle: 'long' })}
		</p>
	</div>

	<svelte:component this={data.content} />
</article>
