<script lang="ts">
	import LinkedinIcon from 'svelte-icons/fa/FaLinkedinIn.svelte';
	import GithubIcon from 'svelte-icons/fa/FaGithub.svelte';
	import Icon from '$lib/components/styling/Icon.svelte';
	import Prose from '../styling/Prose.svelte';

	export let footer = false;
</script>

<Prose>
	<p class="mb-6 {footer ? 'pr-0' : 'pr-12'} sm:pr-20">
		I’m a computer science engineer with interest in a wide range of topics, including productivity,
		PKM, artificial intelligence, product development and game design.
	</p>
	<p class="{footer ? 'mb-6' : 'mb-12'} sm:mb-12 {footer ? 'pr-0' : 'pr-12'} sm:mb-6 sm:pr-36">
		On my blog, you will find posts about personal projects, workflow and productivity, and reviews.
		Find out more about me <a href="/about">here</a>.
	</p>
	<div class="not-prose flex gap-x-4">
		<a href="https://github.com/mcndt" target="_blank" rel="noreferrer">
			<Icon size={footer ? 'small' : 'medium'}>
				<GithubIcon />
			</Icon>
		</a>
		<a
			href="https://www.linkedin.com/in/maxime-cannoodt-7b2697192/"
			target="_blank"
			rel="noreferrer"
		>
			<Icon size={footer ? 'small' : 'medium'}>
				<LinkedinIcon />
			</Icon>
		</a>
	</div>
</Prose>
