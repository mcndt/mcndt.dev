<script lang="ts">
	import AboutMe from './components/AboutMe.svelte';
	import Card from '$lib/components/timeline/TimelineItem.svelte';
	import Timeline from '$lib/components/timeline/Timeline.svelte';
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import type { PageData } from './$types';
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import Dotted from '$lib/components/styling/DottedBg.svelte';
	import _ from 'lodash';
	import TagFilter from './components/TagFilter.svelte';

	export let data: PageData;

	let { posts } = data;

	let tags: string[] = [];
	let filteredPosts: PostMetadata[] = [];
	let selectedTag: string | 'All' = 'All';

	$: {
		const postTags = _(posts)
			.flatMap((post) => post.tags)
			.uniq()
			.sort()
			.value();

		tags = ['All', ...postTags];
	}

	$: filteredPosts =
		selectedTag === 'All' ? posts : posts.filter((post) => post.tags.includes(selectedTag));
</script>

<PageContent>
	<AboutMe />
	<TagFilter {tags} bind:selectedTag />

	<div class="pb-12">
		{#if filteredPosts.length > 0}
			<Timeline posts={filteredPosts} />
		{/if}
	</div>
</PageContent>
