<script lang="ts">
	export let title: string;
	export let date: string;
	export let tags: string[];
</script>

<article class=" mx-auto max-w-[720px] font-body dark:text-cream-400">
	<header class="mb-6 md:mb-8">
		<h2
			class="mb-3 font-header text-4xl font-extrabold
      text-black dark:text-cream-700 md:text-5xl"
		>
			{title}
		</h2>
		<h3 class="text-sm text-stone-500">
			{date}
		</h3>
	</header>
	space-y-8 sm:space-y-12
	<div
		id="content"
		class="
    prose 
    max-w-[720px]
    prose-headings:font-header
    prose-h2:text-3xl
    prose-h3:text-2xl
    prose-code:bg-[#EEEEEE]
    prose-code:before:content-['']
		prose-code:after:content-['']
    dark:prose-invert
    prose-code:dark:bg-stone-700
    "
	>
		<slot />
	</div>
</article>
