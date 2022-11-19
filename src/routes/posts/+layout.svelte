<script lang="ts">
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const { post } = data;

	console.log(post);
</script>

<div
	class="mx-auto mb-12 h-full max-w-4xl border-2 border-black bg-white pt-8 pb-12 
	drop-shadow-sharp dark:border-cream-500 dark:bg-neutral-900 
	dark:drop-shadow-sharp-dark"
>
	<slot />
</div>
