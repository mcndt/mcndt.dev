<script scope="module" lang="ts">
	import Card from '$lib/components/styling/Card.svelte';

	let cls = '';

	export { cls as class };
</script>

<footer class={cls}>
	<Card class="flex flex-wrap justify-center gap-2">
		<span>
			Built with love by <a class="underline" href="/">mcndt</a>
		</span>
		<span>-</span>
		<a class="underline" href="/rss.xml">RSS</a>
		<span>-</span>
		<a class="underline" href="https://www.buymeacoffee.com/mcndt">☕ Buy me a coffee</a>
	</Card>
</footer>
