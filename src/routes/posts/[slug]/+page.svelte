<script lang="ts">
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import type { PageData } from './$types';
	import PostContent from './PostContent.svelte';

	export let data: PageData;

	const dateString = new Date(data.date).toLocaleDateString('en-US', { dateStyle: 'long' });

	const { content, ...contentProps } = data;
</script>

<div class="bg-white pt-10 dark:bg-stone-900">
	<PageContent>
		<PostContent {...contentProps} date={dateString}>
			<svelte:component this={content} />
		</PostContent>
	</PageContent>
</div>
