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
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	export let data: PageData;

	let { posts } = data;

	let tags: string[] = [];
	let filteredPosts: PostMetadata[] = [];
	let selectedTag: string = 'All';

	// Read tag from URL on client-side navigation
	if (browser) {
		selectedTag = new URLSearchParams(window.location.search).get('tag') || 'All';
	}

	$: {
		const postTags = _(posts)
			.flatMap((post) => post.tags)
			.countBy()
			.entries()
			.orderBy(([, count]) => count, 'desc')
			.map(([tag]) => tag)
			.value();

		tags = ['All', ...postTags];
	}

	$: filteredPosts =
		selectedTag === 'All' ? posts : posts.filter((post) => post.tags.includes(selectedTag));

	function onSelectTag(tag: string) {
		selectedTag = tag;
		if (browser) {
			const url = new URL(window.location.href);
			if (tag === 'All') {
				url.searchParams.delete('tag');
			} else {
				url.searchParams.set('tag', tag);
			}
			goto(url, { replaceState: true, keepFocus: true, noScroll: true });
		}
	}
</script>

<PageContent>
	<AboutMe />
	<TagFilter {tags} {selectedTag} onSelect={onSelectTag} />

	<div class="pb-12">
		{#if filteredPosts.length > 0}
			<Timeline posts={filteredPosts} />
		{/if}
	</div>
</PageContent>
