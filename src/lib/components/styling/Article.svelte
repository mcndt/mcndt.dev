<script lang="ts">
	import Prose from '$lib/components/styling/Prose.svelte';

	let cls = '';

	export { cls as class };
</script>

<article class="{cls} mx-auto max-w-[720px] font-body dark:text-cream-400">
	<Prose class="mb-12">
		<slot />
	</Prose>
</article>
