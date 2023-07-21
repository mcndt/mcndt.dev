<script lang="ts">
	import LinkedinIcon from 'svelte-icons/fa/FaLinkedinIn.svelte';
	import GithubIcon from 'svelte-icons/fa/FaGithub.svelte';
	import Icon from '../../lib/components/styling/Icon.svelte';
	import AboutMeContent from '$lib/components/components/AboutMeContent.svelte';
</script>

<div class="relative mx-auto mb-20 mt-8 max-w-[720px] sm:mt-16">
	<div
		class="absolute -left-4 -top-8 z-10 bg-[#1B1711] px-6 pb-6 pt-4 text-white
	drop-shadow-[8px_6px_0px_var(--yellow-accent)] dark:text-cream-700 dark:drop-shadow-[8px_6px_0px_var(--yellow-accent)] md:-left-8 
	lg:-left-12 lg:-top-10 lg:px-8 lg:pb-8 lg:pt-6"
	>
		<h2 class="lg:leading-12 font-header text-4xl font-bold leading-10 sm:text-5xl lg:text-[60px] ">
			Hello! I'm mcndt.
		</h2>
	</div>
	<div
		class="absolute -bottom-8 -right-4 z-10 h-[160px] w-[160px] rounded-full 
	border-[3px] border-black bg-[url(/profile-pic.jpg)] bg-cover px-6 pb-6
	pt-4 text-white drop-shadow-[8px_6px_0px_var(--blue-accent)] md:-right-12"
	/>
	<div
		class="border-2 border-black bg-white pb-6 pl-12 pt-8 
	drop-shadow-sharp dark:border-cream-300 dark:bg-neutral-900 dark:text-cream-700 
	dark:drop-shadow-sharp-dark"
	>
		<div
			class="mt-10 font-body text-lg leading-8 text-stone-800 
		dark:text-cream-500 lg:mt-14"
		>
			<AboutMeContent />
		</div>
	</div>
</div>
