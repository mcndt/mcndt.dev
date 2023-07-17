<div class="utterances-light">
	<script
		src="https://utteranc.es/client.js"
		repo="mcndt/mcndt.dev"
		issue-term="pathname"
		label="💬 post discussion"
		theme="github-light"
		crossorigin="anonymous"
		async
	>
	</script>
</div>

<div class="utterances-dark">
	<script
		src="https://utteranc.es/client.js"
		repo="mcndt/mcndt.dev"
		issue-term="pathname"
		label="💬 post discussion"
		theme="github-dark"
		crossorigin="anonymous"
		async
	>
	</script>
</div>

<style global lang="scss">
	:not(.dark) .utterances-dark {
		display: none;
	}

	:not(.dark) .utterances-light {
		display: block;
	}

	.dark .utterances-dark {
		display: block !important;
	}

	.dark .utterances-light {
		display: none !important;
	}
</style>
