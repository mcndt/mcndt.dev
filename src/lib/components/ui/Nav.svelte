<script>
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
</script>

<div
	id="nav"
	class="flex
			h-full min-h-[65px] flex-col justify-center
			border-b-[3px] border-black bg-white drop-shadow-[0px_8px_0px_rgba(157,150,137,0.5)] 
			dark:border-cream-700
			dark:bg-black dark:text-cream-700 dark:drop-shadow-[0px_8px_0px_rgba(157,150,137,0.2)]"
>
	<div
		class="mx-auto my-2 flex w-full max-w-6xl 
			flex-wrap items-center justify-between gap-y-1.5 gap-x-4 px-8"
	>
		<div id="nav-left" class="flex space-x-3">
			<a href="/" class="font-header text-4xl hover:underline">mcndt</a>
			<span class="pt-1.5">
				<ThemeToggle />
			</span>
		</div>
		<div id="nav-right" class="flex space-x-4 font-header text-2xl">
			<slot />
		</div>
	</div>
</div>
