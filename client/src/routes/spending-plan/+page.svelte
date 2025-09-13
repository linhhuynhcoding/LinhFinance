<script lang="ts">
	import SpendingSummary from '$lib/components/SpendingSummary.svelte';
	import SpendingChart from '$lib/components/SpendingChart.svelte';
	import TransactionsTable from '$lib/components/TransactionsTable.svelte';

	export let data;
</script>

<h1 class="mb-4 text-2xl font-bold">Spending Plan</h1>

<div class="flex flex-col gap-6">
	<SpendingSummary {...data.summary} />
</div>

<div class="mt-6 grid grid-cols-3 gap-6">
	<SpendingChart data={data.spending} />
	<TransactionsTable data={data.transactions} />
</div>
