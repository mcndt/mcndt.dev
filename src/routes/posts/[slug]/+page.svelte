<script lang="ts">
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import type { PageData } from './$types';
	import PostContent from './components/PostContent.svelte';

	export let data: PageData;

	const dateString = new Date(data.date).toLocaleDateString('en-US', { dateStyle: 'long' });

	const { content, ...contentProps } = data;
</script>

<div
	class="mb-12 border-b-[3px] border-black bg-white pb-10
pt-10 drop-shadow-[0px_8px_0px_rgba(157,150,137,0.5)] 
dark:border-cream-700 dark:bg-stone-900
dark:drop-shadow-[0px_8px_0px_rgba(157,150,137,0.2)]"
>
	<PageContent>
		<PostContent {...contentProps} date={dateString}>
			<svelte:component this={content} />
		</PostContent>
	</PageContent>
</div>
