<script lang="ts">
	export let title: string = '';
	export let caption: string = '';
	export let attrlink: string = '';
	export let attr: string = '';
	export let src: string = '';
	export let width: number | undefined = undefined;
</script>

<div id="figure" class="my-[1.25em]">
	<div id="figure-content">
		{#if !!src}
			<img {src} alt={title} {width} class="m-0" />
		{:else}
			<slot />
		{/if}
	</div>
	<div id="figure-subscript" class="flex w-full flex-col items-center gap-1">
		{#if title}
			<div id="figure-title" class="font-bold">{title}</div>
		{/if}

		{#if caption}
			<div id="figure-caption" class="text-sm text-stone-500">{caption}</div>
		{/if}

		{#if attr}
			<div id="figure-attr" class="text-sm">
				{#if !!attrlink}
					<a href={attrlink}>{attr}</a>
				{:else}
					{attr}
				{/if}
			</div>
		{/if}
	</div>
</div>

<style global lang="scss">
	#figure-title {
		&:before {
			content: 'Figure ' counter(figure-number) ': ';
			counter-increment: figure-number;
		}
	}
</style>
