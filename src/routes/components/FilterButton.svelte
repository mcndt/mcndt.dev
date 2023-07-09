<script lang="ts">
	import Tag from '../../lib/components/styling/Tag.svelte';

	export let text: string;
	export let selected: boolean;
</script>

<button on:click>
	<Tag {selected} clickable>
		{text}
	</Tag>
</button>
