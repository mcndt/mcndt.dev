<!-- 
	 -->
<script lang="ts">
	let cls: string = '';

	export { cls as class };
</script>

<div
	class="{cls} layout-container
bg-[radial-gradient(circle_at_1px_1px,_black_1px,_white_0)] pb-1
dark:bg-[radial-gradient(circle_at_1px_1px,_#78716c_1px,_#0a0a0a_0)]"
>
	<slot />
</div>

<style>
	.layout-container {
		background-size: 28px 28px;
	}
</style>
