<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let value: string;
</script>

<li class="form-item">
	<label class="label" for={id}>{label}</label>
	<div class="input-text-wrapper">
		<input class="input-text" type="text" {name} {id} bind:value />
	</div>
</li>
