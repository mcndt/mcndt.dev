<script lang="ts">
	import Dotted from '../styling/DottedBg.svelte';

	export let bg: 'dotted' | 'solid' = 'solid';
	let cls = '';

	export { cls as class };
</script>

<div class="{cls} mx-auto max-w-6xl p-6 md:p-8">
	{#if bg === 'dotted'}
		<Dotted>
			<slot />
		</Dotted>
	{:else}
		<slot />
	{/if}
</div>
