<script lang="ts">
	import { theme } from '$lib/stores/shiki';
	import { getIcon } from '$lib/utilities/icons';

	export let tabs: string[] = [];
	export let selectedTab: number = 0;

	function updateTabValue(event: Event, tabIndex: number) {
		event.stopPropagation();
		const target = event.target as HTMLInputElement;

		if (target.value.includes('\t')) {
			target.value = target.value.replace(/\t/g, '');
		}

		if (target.value.includes('\n')) {
			target.value = target.value.replace(/\n/g, '');
		}

		if (event instanceof KeyboardEvent && event.key === 'Enter') {
			event.preventDefault();
			target.blur();
		}

		tabs[tabIndex] = target.value;
	}
</script>

{#await $theme then theme}
	<ul
		style={`
			--default-foreground: ${theme?.fg || 'inherit'};
			--active-tab-foreground: ${theme?.colors?.['tab.activeForeground'] || 'inherit'};
			--inactive-tab-foreground: ${theme?.colors?.['tab.inactiveForeground'] || 'inherit'};
			--active-tab-background: ${theme?.colors?.['tab.activeBackground'] || 'inherit'};
			--inactive-tab-background: ${theme?.colors?.['tab.inactiveBackground'] || 'inherit'};
		`}
	>
		<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
		{#each tabs as tab, tabIndex}
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<li class:selected={selectedTab === tabIndex} on:click={() => (selectedTab = tabIndex)}>
				<span
					role="textbox"
					spellcheck="false"
					contenteditable
					on:change={(event) => updateTabValue(event, tabIndex)}
				>
					<span class={`${getIcon(tab.split('.').pop() || '')}`} aria-hidden="true" />
					{tab}
				</span>
				{#if selectedTab === tabIndex}
					<button
						type="button"
						class="close-tab"
						on:click={() => {
							tabs = tabs.filter((_, i) => i !== tabIndex);
							if (selectedTab === tabIndex) selectedTab = 0;
						}}>✕</button
					>
				{/if}
			</li>
		{/each}
		<button
			type="button"
			class="add-tab"
			on:click={() => {
				tabs = [...tabs, 'file.txt'];
			}}>+</button
		>
	</ul>
{/await}

<style>
	ul {
		display: flex;
		align-items: center;
		padding: 0;
		margin: 0.25em 0 0 0;
		list-style: none;
		border-radius: 0.5em;
		align-items: stretch;
	}

	li {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background: transparent;
		padding: 0.25em 0.75em;
		gap: 0.5em;
		min-width: 12ch;
		color: var(--inactive-tab-foreground);
		background: var(--inactive-tab-background);
		border-top: 1px solid var(--active-tab-background);
	}

	.selected {
		color: var(--active-tab-foreground);
		background: var(--active-tab-background);
		border-top: 1px solid var(--active-tab-foreground);
	}

	span {
		font-family: sans-serif;
		color: inherit;
		line-height: 1em;
	}

	span:focus,
	span:focus-visible {
		outline: none;
		box-shadow: none;
	}

	.close-tab {
		background: none;
		border: none;
		font-size: 0.75em;
		cursor: pointer;
		color: inherit;
	}

	.add-tab {
		background: none;
		border: none;
		color: inherit;
		font-size: 1.25em;
		line-height: 1em;
		display: grid;
		place-items: center;
		cursor: pointer;
		margin-left: 0.5em;
		margin-bottom: 0.25em;
	}
</style>
