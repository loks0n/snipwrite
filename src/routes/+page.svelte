<script lang="ts">
	import Background, { type BackgroundOptions } from '$lib/components/background.svelte';
	import Editor, { type EditorOptions } from '$lib/components/editor/editor.svelte';
	import NumericInput from '$lib/components/form/numericInput.svelte';
	import SelectInput from '$lib/components/form/selectInput.svelte';
	import SwitchInput from '$lib/components/form/switchInput.svelte';
	import TextInput from '$lib/components/form/textInput.svelte';
	import Frame, { type FrameBindings, type FrameOptions } from '$lib/components/frame/frame.svelte';
	import Main from '$lib/layouts/main.svelte';
	import { language, themeName, codeRaw } from '$lib/stores/shiki';
	import { BUNDLED_LANGUAGES, BUNDLED_THEMES } from 'shiki-es';

	let backgroundOptions: BackgroundOptions = {
		background: 'linear-gradient(90deg, #ff9a9e 0%, #fad0c4 100%)',
		widthPx: 700,
		heightPx: 500
	};

	let editorOptions: EditorOptions = {
		showLineNumbers: true,
		fontSizePx: '16',
		lineHeightPc: '150'
	};

	let frameOptions: FrameOptions = {
		showTopBar: true,
		showTabs: true,
		showControls: true,

		borderRadiusPx: '16'
	};

	let frameBindings: FrameBindings = {
		tabs: ['index.js'],
		selectedTab: 0
	};
</script>

<Main>
	<div class="u-flex u-gap-16 u-margin-block-start-16">
		<form class="form u-width-full-line u-max-width-300">
			<ul class="form-list">
				<SelectInput
					id="language"
					name="language"
					label="Language"
					bind:value={$language}
					options={BUNDLED_LANGUAGES.map((language) => ({
						value: language.id,
						label: language.displayName ?? language.id
					}))}
				/>
				<SelectInput
					id="theme"
					name="theme"
					label="Theme"
					bind:value={$themeName}
					options={BUNDLED_THEMES.map((theme) => ({
						value: theme,
						label: theme
					}))}
				/>
				<SelectInput
					id="font-size"
					name="font-size"
					label="Font Size"
					bind:value={editorOptions.fontSizePx}
					options={[
						{ value: '12', label: '12px' },
						{ value: '14', label: '14px' },
						{ value: '16', label: '16px' },
						{ value: '18', label: '18px' },
						{ value: '20', label: '20px' },
						{ value: '22', label: '22px' },
						{ value: '24', label: '24px' },
						{ value: '26', label: '26px' }
					]}
				/>
				<TextInput
					id="background"
					name="background"
					label="Background"
					bind:value={backgroundOptions.background}
				/>
				<SelectInput
					id="line-height"
					name="line-height"
					label="Line Height"
					bind:value={editorOptions.lineHeightPc}
					options={[
						{ value: '100', label: '100%' },
						{ value: '125', label: '125%' },
						{ value: '150', label: '150%' },
						{ value: '175', label: '175%' },
						{ value: '200', label: '200%' }
					]}
				/>
				<SelectInput
					id="border-radius"
					name="border-radius"
					label="Border Radius"
					bind:value={frameOptions.borderRadiusPx}
					options={[0, 4, 8, 12, 16, 20, 24, 28, 32].map((borderRadius) => ({
						value: `${borderRadius}`,
						label: `${borderRadius}px`
					}))}
				/>
				<SwitchInput
					id="line-numbers"
					name="line-numbers"
					label="Line Numbers"
					bind:checked={editorOptions.showLineNumbers}
				/>
				<SwitchInput
					id="top-bar"
					name="top-bar"
					label="Top Bar"
					bind:checked={frameOptions.showTopBar}
				/>
				<NumericInput
					id="width"
					name="width"
					label="Width"
					step={10}
					bind:value={backgroundOptions.widthPx}
				/>
				<NumericInput
					id="height"
					name="height"
					label="Height"
					step={10}
					bind:value={backgroundOptions.heightPx}
				/>
			</ul>
			<button class="button u-grid u-margin-block-start-16 u-width-full-line" type="submit"
				>Download</button
			>
		</form>
		<Background options={backgroundOptions}>
			<Frame
				bind:tabs={frameBindings.tabs}
				bind:selectedTab={frameBindings.selectedTab}
				options={frameOptions}
			>
				<Editor bind:codeRaw={$codeRaw} options={editorOptions} />
			</Frame>
		</Background>
	</div>
</Main>

<style>
	ul {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: auto;
	}
</style>
