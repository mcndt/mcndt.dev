<script lang="ts">
	import PageContent from '$lib/components/ui/PageContent.svelte';
	import Article from '$lib/components/styling/Article.svelte';
</script>

<div
	class="mb-6 border-b-[3px] border-black bg-white pb-10
pt-10 drop-shadow-[0px_8px_0px_rgba(157,150,137,0.5)] 
dark:border-cream-700 dark:bg-neutral-900
dark:drop-shadow-[0px_8px_0px_rgba(157,150,137,0.2)]"
>
	<PageContent>
		<Article>
			<slot />
		</Article>
	</PageContent>
</div>
