<!-- 
	 -->
<script lang="ts">
	let cls: string = '';

	export { cls as class };
</script>

<div
	class="{cls} 
	layout-container
	bg-[radial-gradient(circle_at_12px_12px,_#737373_1px,_white_0)]
	pb-1 
	dark:bg-[radial-gradient(circle_at_12px_12px,_#78716c_1px,_#0a0a0a_0)]
	"
>
	<slot />
</div>

<style>
	.layout-container {
		background-size: 24px 24px;
	}
</style>
