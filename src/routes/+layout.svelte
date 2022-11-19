<script>
	import DottedBg from '$lib/components/styling/DottedBg.svelte';
	import Nav from '$lib/components/ui/Nav.svelte';
	import '../app.css';
</script>

<div class="v-full layout-container h-full bg-white dark:bg-[#0a0a0a]">
	<Nav>
		<a href="/blog" class="hover:underline">Blog</a>
		<a href="/projects" class="hover:underline">Projects</a>
		<a href="/about" class="hover:underline">About</a>
		<a href="/resume" class="hover:underline">Resume</a>
		<a href="/archive" class="hover:underline">Archive</a>
	</Nav>
	<DottedBg>
		<slot />
	</DottedBg>
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
