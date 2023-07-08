<script lang="ts">
	let cls: string = '';

	export { cls as class };
</script>

<div
	class="{cls} block border-2 border-black bg-white 
	py-4  px-6 shadow-sharp 
  	dark:border-cream-300 dark:bg-neutral-900 
	dark:text-cream-700 dark:shadow-sharp-dark 

"
>
	<slot />
</div>
