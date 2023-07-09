<script lang="ts">
	import TimelineCard from './TimelineCard.svelte';

	export let tickLocation: 'left' | 'right' = 'left';
	export let title: string;
	export let date: string;
	export let summary: string;
	export let href: string;
	export let isNew: boolean = false;

	const hOffset = 34;
	const hPos =
		tickLocation === 'left'
			? 'right-[calc(100%_+_26px)]'
			: 'right-[calc(100%_+_26px)] lg:-right-[38px]';
</script>

<div id="card-container" class="relative">
	<div
		class="group flex flex-col gap-y-2 transition 
		ease-out hover:-translate-y-1 hover:scale-[1.025] active:scale-[0.98]"
	>
		<a {href} class:new-card-tag={isNew}>
			<TimelineCard {title} {date} {summary} />
		</a>
	</div>
	<div
		class={`hidden sm:block absolute ${hPos} top-16
		h-3 aspect-square border-[3px] border-black dark:border-cream-500
		bg-white dark:bg-neutral-900 rounded-full`}
	/>
	<div class={`hidden sm:block absolute ${hPos} top-16`} />
</div>

<style lang="scss">
	.new-card-tag {
		position: relative;

		&:after {
			position: absolute;
			top: -8px;
			right: -16px;
			transform: rotate(12.5deg);

			content: 'NEW!';
			font-family: 'Darker Grotesque', sans-serif;
			color: white;
			font-size: 24px;
			font-weight: 900;
			line-height: 1.2;

			border-radius: 0.25rem;
			padding: 0rem 0.5rem 0.25rem;
			background-color: #ff271a;
		}
	}
</style>
