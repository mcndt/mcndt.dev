<script lang="ts">
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
	<div class="group space-y-2 transition hover:scale-[1.02] active:scale-[0.98]">
		<div id="tags" class="flex gap-1 text-white">
			{#each tags as tag}
				<span class="h-6 rounded-full bg-[#2F8AF5] px-3.5 pt-0.5 font-body text-sm font-bold ">
					{tag}
				</span>
			{/each}

			<!-- <span class="h-6 rounded-full bg-[#2F8AF5] px-3.5 pt-0.5 font-body text-sm font-bold"
				>Hack
			</span>
			<span class="h-6 rounded-full bg-[#F17357] px-3.5 pt-0.5 font-body text-sm font-bold"
				>Noteshare.space</span
			> -->
		</div>
		<a
			{href}
			id="card"
			class="block cursor-pointer space-y-2.5 border-2 border-black bg-white py-4 px-6 
			drop-shadow-sharp transition group-hover:drop-shadow-sharp-hover 
			group-active:drop-shadow-sharp-active dark:border-cream-500 dark:bg-neutral-900 
			dark:text-cream-700 dark:drop-shadow-sharp-dark dark:group-hover:drop-shadow-sharp-dark-hover
			 dark:group-active:drop-shadow-sharp-dark-active"
		>
			<h3 class="font-header text-3xl font-black">{title}</h3>
			<p class="pr-8 font-body text-sm leading-6 text-stone-800 line-clamp-3 dark:text-cream-500">
				{summary}
			</p>
			<div class="flex w-full justify-between font-header text-xl font-bold lg:text-lg">
				<span class="group-hover:underline">Read more -></span>
				<span>{date}</span>
			</div>
		</a>
	</div>
	<div
		class={`hidden sm:block absolute ${hPos} top-16 h-4 w-4 border-[3px] border-black dark:border-cream-500 bg-white dark:bg-neutral-900 rounded-full`}
	/>
</div>
