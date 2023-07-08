<script lang="ts">
	import FilterButton from './FilterButton.svelte';

	export let tags: string[] = [];
	export let selectedTag: string;

	function selectTag(tag: string) {
		selectedTag = tag;
	}
</script>

<div class="filter-buttons mb-8 flex flex-wrap gap-x-1 gap-y-1.5">
	{#each tags as text}
		<FilterButton {text} selected={text === selectedTag} on:click={() => selectTag(text)} />
	{/each}
</div>
