<script lang="ts" context="module">
	export type FrameOptions = {
		borderRadiusPx: string;
		showTopBar: boolean;
		showTabs: boolean;
		showControls: boolean;
	};

	export type FrameBindings = {
		tabs: string[];
		selectedTab: number;
	};
</script>

<script lang="ts">
	import { theme } from '$lib/stores/shiki';

	import Controls from './controls.svelte';
	import Tabs from './tabs.svelte';

	export let options: FrameOptions = {
		borderRadiusPx: '0',
		showTopBar: true,
		showTabs: true,
		showControls: true
	};

	export let tabs: string[] = ['index.js'];
	export let selectedTab: number = 0;
</script>

{#await $theme then theme}
	<div
		style={`
	--background: ${
		theme?.colors?.['tab.inactiveBackground'] || theme?.colors?.['editor.background'] || 'white'
	};
	--border-radius: ${options.borderRadiusPx}px;
`}
	>
		{#if options.showTopBar}
			<nav>
				{#if options.showControls}
					<Controls />
				{/if}

				{#if options.showTabs}
					<Tabs bind:tabs bind:selectedTab />
				{/if}
			</nav>
		{/if}
		<slot />
	</div>
{/await}

<style>
	div {
		overflow: hidden;
		border-radius: var(--border-radius);
		box-shadow: 0 0 0.5em 0.5em rgba(0, 0, 0, 0.178);
		background: var(--background);
	}

	nav {
		width: 100%;
		padding: 0 1.5em;
		display: flex;
		justify-content: start;
		align-items: center;
		gap: 1em;
		height: 3em;
	}
</style>
