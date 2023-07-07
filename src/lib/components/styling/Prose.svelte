<script lang="ts">
	let cls = '';
	export { cls as class };
</script>

<div
	id="content"
	class="
  {cls}
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
