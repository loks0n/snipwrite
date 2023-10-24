<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let value: string | undefined;
	export let options: { value: string; label: string }[] = [];
</script>

<li class="form-item">
	<label class="label" for={id}>{label}</label>
	<div class="select">
		<select {id} {name} bind:value>
			{#each options as option}
				<option value={option.value}>{option.label}</option>
			{/each}
		</select>
		<span class="icon-cheveron-down" aria-hidden="true" />
	</div>
</li>
