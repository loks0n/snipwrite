<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let value: number;
	export let min: number = Number.NEGATIVE_INFINITY;
	export let max: number = Number.POSITIVE_INFINITY;
	export let step: number = 1;
</script>

<li class="form-item">
	<label class="label" for={id}>{label}</label>
	<div class="input-text-wrapper" style="--amount-of-buttons: 1;">
		<input
			type="number"
			class="input-text u-remove-input-number-buttons"
			{id}
			{name}
			{step}
			{min}
			{max}
			bind:value
		/>
		<button
			class="button is-text u-height-auto u-padding-0 u-position-absolute u-inset-block-start-4 u-inset-inline-end-8"
			aria-label="Up value of numeric field"
			type="button"
			on:click={() => {
				value = Math.min(max, value + step);
			}}
		>
			<span class="icon-cheveron-up u-line-height-0-7" aria-hidden="true" />
		</button>
		<button
			class="button is-text u-height-auto u-padding-0 u-position-absolute u-inset-block-end-4 u-inset-inline-end-8"
			aria-label="Down value of numeric field"
			type="button"
			on:click={() => {
				value = Math.max(min, value - step);
			}}
		>
			<span class="icon-cheveron-down u-line-height-0-7" aria-hidden="true" />
		</button>
	</div>
</li>
