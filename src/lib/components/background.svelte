<script lang="ts" context="module">
	export type BackgroundOptions = {
		background: string;
		heightPx: number;
		widthPx: number;
	};
</script>

<script lang="ts">
	export let options: BackgroundOptions = {
		background: 'transparent',
		heightPx: 500,
		widthPx: 500
	};
</script>

<div
	style={`
        --width: ${options.widthPx}px;
        --height: ${options.heightPx}px;
        --background: ${options.background};
`}
>
	<slot />
</div>

<style>
	div {
		width: var(--width);
		height: var(--height);
		background: var(--background);

		display: grid;
		place-items: center;
	}
</style>
