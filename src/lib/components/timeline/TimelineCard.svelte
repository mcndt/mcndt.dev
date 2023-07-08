<script lang="ts">
	import Card from '../styling/Card.svelte';
	import TimelineTags from './TimelineTags.svelte';

	export let title: string;
	export let date: string;
	export let summary: string;
	export let tags: string[];
</script>

<Card
	class=" cursor-pointer space-y-4  
	transition group-hover:shadow-sharp-hover 
	group-active:shadow-sharp-active 
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
</Card>
