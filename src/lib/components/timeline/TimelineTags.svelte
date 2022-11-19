<script lang="ts">
	export let tags: string[];
</script>

<div id="tags" class="flex gap-1 text-white">
	{#each tags as tag}
		<span class="h-6 rounded-full bg-cream-100 px-3.5 pt-0.5 font-body text-sm font-bold ">
			{tag}
		</span>
	{/each}
</div>
