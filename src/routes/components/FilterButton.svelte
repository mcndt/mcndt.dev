<script lang="ts">
	export let text: string;
	export let selected: boolean;

	const selectedClass = `bg-white text-black
		dark:border-cream-700 dark:bg-neutral-900 dark:text-cream-700`;

	const unselectedClass = `bg-black text-white dark:bg-cream-700 dark:text-black`;

	const commonClass = `box-border h-8 rounded-full border-[3px] border-black
		align-middle font-header text-xl leading-5 px-3 pb-1 hover:underline whitespace-nowrap
		transition-colors duration-200 ease-in-out
		`;
</script>

<button on:click class="filter-button {commonClass} {selected ? selectedClass : unselectedClass}"
	>{text}</button
>
