<script lang="ts">
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import type { PageData } from './$types';
	import PostContent from './components/PostContent.svelte';
	import { SITE_URL } from '$lib/siteConfig';

	export let data: PageData;
	const { component, frontmatter } = data;

	const dateString = new Date(frontmatter.date).toLocaleDateString('en-US', { dateStyle: 'long' });

	const { title, date, tags, slug, summary, ogImage } = frontmatter;
	const pageUrl = `${SITE_URL}/posts/${slug}`;
	const imageUrl = ogImage ? `${SITE_URL}${ogImage}` : undefined;
</script>

<svelte:head>
	<meta property="og:title" content={title} />
	<meta property="og:description" content={summary} />
	<meta property="og:url" content={pageUrl} />
	<meta property="og:type" content="article" />
	{#if imageUrl}
		<meta property="og:image" content={imageUrl} />
		<meta name="twitter:card" content="summary_large_image" />
	{:else}
		<meta name="twitter:card" content="summary" />
	{/if}
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={summary} />
</svelte:head>

<div
	class="mb-6 border-b-[3px] border-black bg-white pb-10
drop-shadow-[0px_8px_0px_rgba(157,150,137,0.5)] dark:border-cream-700 
dark:bg-neutral-900 dark:drop-shadow-[0px_8px_0px_rgba(157,150,137,0.2)]
sm:pt-10"
>
	<PageContent>
		<PostContent {title} {tags} date={dateString}>
			<svelte:component this={component} />
		</PostContent>
	</PageContent>
</div>
