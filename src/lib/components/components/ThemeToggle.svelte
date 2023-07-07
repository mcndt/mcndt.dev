<script lang="ts">
	import { browser } from '$app/environment';
	import DarkIcon from 'svelte-icons/io/IoMdMoon.svelte';
	import LightIcon from 'svelte-icons/io/IoMdSunny.svelte';

	let dark: boolean = browser && localStorage.getItem('theme') === 'dark';

	function onClick() {
		dark = !dark;

		if (dark) {
			localStorage.setItem('theme', 'dark');
			document.documentElement.classList.add('dark');
		} else {
			localStorage.setItem('theme', 'light');
			document.documentElement.classList.remove('dark');
		}
	}
</script>

<button
	on:click={onClick}
	class="h-full w-full self-center rounded p-1.5  
   py-0 px-0 hover:bg-stone-100
    dark:hover:bg-stone-800"
>
	<span class="flex items-center justify-center gap-2">
		<div class="flex h-full flex-col justify-center">
			<span class="inline-block h-6 w-6 text-black dark:text-cream-700">
				{#if dark}
					<LightIcon />
				{:else}
					<DarkIcon />
				{/if}
			</span>
		</div>
	</span>
</button>
