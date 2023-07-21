<script lang="ts">
	import '../app.css';
	import Card from '$lib/components/styling/Card.svelte';
	import DottedBg from '$lib/components/styling/DottedBg.svelte';
	import Footer from './components/Footer.svelte';
	import Nav from '$lib/components/ui/Nav.svelte';
	import { afterNavigate } from '$app/navigation';
	import { page } from '$app/stores';
	import { SITE_TITLE } from '$lib/siteConfig';

	let containerRef: HTMLDivElement;

	afterNavigate((nav) => {
		if (nav.from?.route.id === nav.to?.route.id) {
			return;
		}
		containerRef.scrollTo({ top: 0, behavior: 'instant' });
	});
</script>

<svelte:head>
	<title>{$page.data.title ?? 'mcndt'} | Maxime Cannoodt</title>

	<link
		rel="alternate"
		type="application/rss+xml"
		title={'RSS Feed for ' + SITE_TITLE}
		href="/rss.xml"
	/>

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

<div class="h-screen w-full bg-white dark:bg-[#0a0a0a] sm:flex sm:flex-col">
	<div class="z-50">
		<Nav>
			<a href="/" class="hover:underline">Blog</a>
			<a href="/projects" class="hover:underline">Projects</a>
			<a href="/about" class="hover:underline">About</a>
			<a href="/resume.pdf" class="hover:underline">Resume</a>
			<a href="/archive" class="hover:underline">Archive</a>
		</Nav>
	</div>
	<div bind:this={containerRef} class="h-full grow sm:overflow-y-auto">
		<DottedBg class="flex min-h-full flex-col justify-between">
			<slot />
			<Footer
				class="bottom-0 mx-6 my-4 border-black bg-white shadow-sharp lg:mx-auto lg:max-w-lg"
			/>
		</DottedBg>
	</div>
</div>
