import type { ComponentType, SvelteComponentTyped } from 'svelte';

interface MdsvexFile {
	default: ComponentType<SvelteComponentTyped>;
	metadata: Record<string, string>;
}

export type MdsvexResolver = () => Promise<MdsvexFile>;
