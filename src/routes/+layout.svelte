<script lang="ts">
	import DottedBg from '$lib/components/styling/DottedBg.svelte';
	import Nav from '$lib/components/ui/Nav.svelte';
	import '../app.css';

	import { afterNavigate } from '$app/navigation';
	import Card from '$lib/components/styling/Card.svelte';

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
	<div bind:this={containerRef} class="h-full grow overflow-y-auto">
		<DottedBg class="min-h-full">
			<slot />
			<footer class="mx-6 my-4 border-black bg-white shadow-sharp lg:mx-auto lg:max-w-lg">
				<Card class="flex justify-center gap-2">
					<span>
						Built with love by <a class="underline" href="https://mcndt.dev">mcndt</a>
					</span>
					<span>-</span>
					<a class="underline" href="https://www.buymeacoffee.com/mcndt">☕ Buy me a coffee</a>
				</Card>
			</footer>
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
