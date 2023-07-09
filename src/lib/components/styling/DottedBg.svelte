<!-- 
	 -->
<script lang="ts">
	let cls: string = '';

	export { cls as class };
</script>

<div class="{cls} layout-container pb-1">
	<slot />
</div>

<style lang="scss" global>
	.layout-container {
		--dot-grid-color: #a5a3a3;
		--dot-grid-bg-color: #ffffff;
		--dot-grid-size: 22px;

		background-size: var(--dot-grid-size) var(--dot-grid-size);
		background-image: radial-gradient(
			circle at calc(var(--dot-grid-size) / 2) calc(var(--dot-grid-size) / 2),
			var(--dot-grid-color) 1px,
			var(--dot-grid-bg-color) 0
		);
	}

	.dark {
		.layout-container {
			--dot-grid-color: #78716c;
			--dot-grid-bg-color: #0a0a0a;
		}
	}
</style>
