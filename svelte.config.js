import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import md from 'mdsvex';
import mdsvexConfig from './mdsvex.config.js';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		}),
		md.mdsvex(mdsvexConfig)
	],
	kit: {
		adapter: adapter()
	},
	extensions: ['.svelte', ...mdsvexConfig.extensions]
};

export default config;
