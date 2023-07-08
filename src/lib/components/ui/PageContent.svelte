<script lang="ts">
	import DottedBg from '../styling/DottedBg.svelte';

	export let bg: 'dotted' | 'solid' = 'solid';
	let cls = '';

	export { cls as class };
</script>

<div class="{cls} v-full mx-auto max-w-6xl p-6 md:p-8">
	{#if bg === 'dotted'}
		<DottedBg>
			<slot />
		</DottedBg>
	{:else}
		<slot />
	{/if}
</div>
