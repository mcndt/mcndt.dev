<script lang="ts">
	import type { PostMetadata } from '$lib/types/PostMetadata';
	import _ from 'lodash';
	import type { PageData } from './$types';

	export let data: PageData;

	let { posts } = data;

	let postsByYear: [string, (PostMetadata & { dateObj: Date })[]][] = [];

	$: {
		postsByYear = _(posts)
			.map((post) => ({ ...post, dateObj: new Date(post.date) }))
			.groupBy((post) => post.dateObj.getFullYear())
			.map((posts, year): [string, (PostMetadata & { dateObj: Date })[]] => [year, posts])
			.sortBy(([year]) => year)
			.reverse()
			.value();
	}
</script>

<h1 class="mb-4 text-5xl">Archive</h1>

<div>
	{#each postsByYear as [year, posts]}
		<h2 class="mb-4 mt-0 text-2xl font-black">{year}</h2>
		<ul class="list-none p-0">
			{#each posts as post}
				<a href={`/posts/${post.slug}`} class="hover:underline">
					<li class="flex">
						<span class="basis-1/6 font-header text-xl text-stone-500 dark:text-stone-400">
							{post.dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
						</span>
						<span>
							» {post.title}
						</span>
					</li>
				</a>
			{/each}
		</ul>
		<hr class="mb-4 mt-8" />
	{/each}
</div>
