<script lang="ts">
	import { theme } from '$lib/stores/shiki';
	import type { EditorOptions } from './editor.svelte';

	export let lines: number;
	export let options: EditorOptions;
</script>

{#await $theme then theme}
	<div
		style={`
            --line-number-color: ${
							theme?.colors ? theme.colors['editorLineNumber.foreground'] : 'inherit'
						};
            --font-size: ${options.fontSizePx}px;
            --line-height: ${options.lineHeightPc}%;
        `}
	>
		{#each Array(lines) as _, i}
			<span>{i + 1}</span>
		{/each}
	</div>
{/await}

<style>
	div {
		color: var(--line-number-color);

		display: flex;
		justify-content: start;
		flex-direction: column;
		padding: 1em 0 1em 1em;

		text-align: right;
		line-height: var(--line-height);
		font-family: monospace;
		font-size: var(--font-size);

		user-select: none;
	}
</style>
