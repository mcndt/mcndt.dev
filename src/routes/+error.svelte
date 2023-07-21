<script lang="ts">
	import { page } from '$app/stores';
</script>

<div
	id="container"
	class="flex w-full flex-col items-center overflow-clip px-6 py-12 dark:text-cream-700 2xl:py-24"
>
	<div>
		<div
			id="error-code"
			class="mt-8 rotate-[4deg] overflow-clip whitespace-nowrap text-8xl font-bold font-bold"
		>
			{#each new Array(20) as _}
				{`${$page.status} `}
			{/each}
		</div>
	</div>
	<div id="error-message" class="mt-16 text-5xl font-bold">
		{$page.error?.message}
	</div>
</div>

<style lang="scss">
</style>
