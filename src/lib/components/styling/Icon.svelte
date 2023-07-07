<script lang="ts">
	let clazz: string = '';
	let sizeClass = '';

	type Size = 'small' | 'medium' | 'large';

	export let size: Size = 'medium';

	const sizes: Record<Size, string> = {
		small: 'h-4 w-4',
		medium: 'h-6 w-6',
		large: 'h-8 w-8'
	};

	export { clazz as class };
</script>

<span class="inline-block ${sizes[size]} text-black dark:text-cream-700">
	<span class={clazz}>
		<slot />
	</span>
</span>
