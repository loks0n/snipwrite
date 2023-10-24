<script lang="ts">
	export let id: string;
	export let name: string;
	export let label: string;
	export let checked: boolean;
</script>

<li class="form-item u-flex u-gap-8">
	<input class="switch" type="checkbox" {name} {id} bind:checked />
	<label class="label" for={id}>{label}</label>
</li>
