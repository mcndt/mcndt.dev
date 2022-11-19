<script lang="ts">
	import TimelineCard from './TimelineCard.svelte';
	import TimelineTags from './TimelineTags.svelte';

	export let tickLocation: 'left' | 'right' = 'left';
	export let title: string;
	export let date: string;
	export let summary: string;
	export let tags: string[] = [];
	export let href: string;

	const hOffset = 34;
	const hPos = tickLocation === 'left' ? '-left-[42px]' : '-right-[42px]';
</script>

<div id="card-container" class="relative">
	<div
		class="group flex flex-col gap-y-2 transition 
		ease-out hover:-translate-y-1 hover:scale-[1.025] active:scale-[0.98]"
	>
		<a {href}>
			<TimelineCard {tags} {title} {date} {summary} />
		</a>
	</div>
	<div
		class={`hidden sm:block absolute ${hPos} top-16 h-4 w-4 border-[3px] border-black dark:border-cream-500 bg-white dark:bg-neutral-900 rounded-full`}
	/>
</div>
