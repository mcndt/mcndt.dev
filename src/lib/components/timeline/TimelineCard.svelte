<script lang="ts">
	import TimelineTags from './TimelineTags.svelte';

	export let title: string;
	export let date: string;
	export let summary: string;
	export let tags: string[];
</script>

<div
	id="card"
	class="block cursor-pointer space-y-4 border-2 border-black bg-white py-4 px-6 
	shadow-sharp 
	transition group-hover:shadow-sharp-hover 
	group-active:shadow-sharp-active dark:border-cream-300 dark:bg-neutral-900 
	dark:text-cream-700 
	dark:shadow-sharp-dark 
	dark:group-hover:shadow-sharp-dark-hover
 	dark:group-active:shadow-sharp-dark-active"
>
	<h3 class="font-header text-2xl font-extrabold">{title}</h3>
	<p class="pr-8 font-body text-sm leading-6 text-stone-800 line-clamp-3 dark:text-cream-500">
		{summary}
	</p>
	<div class="flex w-full justify-between font-header text-xl font-bold lg:text-lg">
		<span class="group-hover:underline">Read more -></span>
		<span>{date}</span>
	</div>
</div>
