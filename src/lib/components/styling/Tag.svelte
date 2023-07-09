<script lang="ts">
	export let selected: boolean = false;
	export let clickable: boolean = false;

	const selectedClass = `bg-white text-black dark:bg-neutral-900 dark:text-cream-700`;
	const unselectedClass = `bg-black text-white dark:bg-cream-700 dark:text-black`;

	const commonClass = `inline-block box-border h-8 rounded-full border-[3px] border-black dark:border-cream-700
		align-middle font-header text-xl  px-3 leading-[1.1em] pb-1 whitespace-nowrap
		transition-colors duration-200 ease-in-out line`;
</script>

<div
	class="{selected ? selectedClass : unselectedClass} {commonClass} {clickable
		? 'cursor-pointer hover:underline'
		: ''}"
>
	<slot />
</div>
