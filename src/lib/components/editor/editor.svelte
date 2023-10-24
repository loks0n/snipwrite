<script lang="ts" context="module">
	export type EditorOptions = {
		fontSizePx: string;
		lineHeightPc: string;
		showLineNumbers: boolean;
	};
</script>

<script lang="ts">
	import { checkTab, syncScroll } from '$lib/utilities/editor';
	import { codeHtml, theme } from '$lib/stores/shiki';
	import LineNumbers from './lineNumbers.svelte';

	export let codeRaw: string = '';

	export let options: EditorOptions = {
		fontSizePx: '16',
		lineHeightPc: '150',
		showLineNumbers: true
	};
</script>

{#await $theme then theme}
	<div
		class="editor"
		style={`
			--font-size: ${options.fontSizePx}px;
			--line-height: ${options.lineHeightPc}%;
			--foreground-color: ${theme?.fg || 'inherit'};
			--background-color: ${theme?.bg || 'inherit'};
			--caret-color: ${theme?.colors ? theme.colors['editorCursor.foreground'] : 'white'};
		`}
	>
		{#if options.showLineNumbers}
			<LineNumbers lines={codeRaw.split('\n').length} {options} />
		{/if}
		<div class="relative">
			<textarea
				bind:value={codeRaw}
				wrap="soft"
				spellcheck="false"
				on:scroll={syncScroll}
				on:keydown={checkTab}
			/>
			{#await $codeHtml then codeHtml}
				{#if codeHtml}
					{@html codeHtml}
				{/if}
			{/await}
		</div>
	</div>
{/await}

<style>
	.editor {
		display: flex;
		background: var(--background-color);
	}

	.relative {
		position: relative;
		min-width: 50ch;
		flex: 1;
	}

	textarea,
	:global(pre) {
		margin: 0;
		padding: 1em;
		border: 0;
		top: 0;
		left: 0;
		overflow: auto;
		counter-reset: line;
	}

	textarea {
		z-index: 1;
		color: transparent;
		background: transparent;
		resize: none;
		position: absolute;
		height: 100%;
		width: 100%;
		caret-color: var(--caret-color);
	}

	textarea:focus {
		outline: none;
	}

	:global(pre) {
		z-index: 0;
		height: 100%;
	}

	textarea,
	:global(pre),
	:global(pre) *,
	:global(pre code) {
		font-size: var(--font-size);
		line-height: var(--line-height);
		tab-size: 4;
		letter-spacing: inherit;
		white-space: pre;
		font-family: monospace;
	}
</style>
