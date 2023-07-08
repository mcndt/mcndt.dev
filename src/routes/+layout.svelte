<script lang="ts">
	import DottedBg from '$lib/components/styling/DottedBg.svelte';
	import Nav from '$lib/components/ui/Nav.svelte';
	import '../app.css';

	import { afterNavigate } from '$app/navigation';

	let containerRef: HTMLDivElement;

	afterNavigate(() => {
		containerRef.scrollTo({ top: 0, behavior: 'instant' });
	});
</script>

<div class="flex h-screen w-full flex-col bg-white dark:bg-[#0a0a0a]">
	<div class="top-0 z-50">
		<Nav>
			<a href="/blog" class="hover:underline">Blog</a>
			<a href="/projects" class="hover:underline">Projects</a>
			<a href="/about" class="hover:underline">About</a>
			<a href="/resume" class="hover:underline">Resume</a>
			<a href="/archive" class="hover:underline">Archive</a>
		</Nav>
	</div>
	<div bind:this={containerRef} class="v-full grow overflow-y-auto">
		<DottedBg class="v-full">
			<slot />
		</DottedBg>
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
