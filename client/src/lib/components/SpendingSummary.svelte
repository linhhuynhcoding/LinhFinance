<script lang="ts">
	import Card from './Card.svelte';

	export let income: number;
	export let planned: number;
	export let other: number;
</script>

<Card title="Income after bills & savings">
	<p class="text-2xl font-semibold">${income.toFixed(2)}</p>
	<p class="text-sm text-gray-500">Available</p>
</Card>

<Card title="Planned Spending">
	<p class="text-2xl font-semibold">${planned.toFixed(2)}</p>
</Card>

<Card title="Other Spending">
	<p class="text-2xl font-semibold">${other.toFixed(2)}</p>
</Card>
