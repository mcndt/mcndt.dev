<script>
	import { browser } from '$app/environment';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import '../app.css';
</script>

<div
	class="v-full layout-container h-full bg-[radial-gradient(circle_at_1px_1px,_black_1px,_white_0)] pb-1
	dark:bg-[radial-gradient(circle_at_1px_1px,_#78716c_1px,_#0a0a0a_0)]"
>
	<div
		id="nav"
		class="mb-8 flex
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
				<a href="/blog" class="hover:underline">Blog</a>
				<a href="/projects" class="hover:underline">Projects</a>
				<a href="/about" class="hover:underline">About</a>
				<a href="/resume" class="hover:underline">Resume</a>
				<a href="/archive" class="hover:underline">Archive</a>
			</div>
		</div>
	</div>
	<div class="mx-auto max-w-6xl px-8">
		<slot />
	</div>
</div>

<svelte:head>
	<script>
		if (
			localStorage.getItem('theme') === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	</script>
</svelte:head>

<style lang="scss">
	.layout-container {
		background-size: 28px 28px;
	}
</style>
