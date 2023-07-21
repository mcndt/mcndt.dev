<script lang="ts">
	import '../../../styles/prism-gruvbox-dark.css';

	let cls = '';

	export let noStyling: boolean = false;

	export { cls as class };
</script>

{#if noStyling}
	<slot />
{:else}
	<div id="page-content" class="{cls} v-full mx-auto max-w-6xl p-6 md:p-8">
		<slot />
	</div>
{/if}

<style global>
	#page-content {
		counter-reset: figure-number;
	}
</style>
