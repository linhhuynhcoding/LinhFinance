<script lang="ts">
	import Payouts from '$lib/components/transactions/Payouts.svelte';
	import Income from '$lib/components/transactions/Income.svelte';

	let activeTab: 'payouts' | 'income' = 'payouts';
</script>

<div class="p-8">
	<h1 class="mb-6 text-3xl font-extrabold text-gray-800">💳 Transactions</h1>

	<!-- Tabs -->
	<div class="mb-8 flex space-x-4">
		<button
			class="rounded-xl px-5 py-2 text-sm font-semibold shadow-md
             transition hover:scale-105 hover:shadow-lg
             {activeTab === 'payouts'
				? 'bg-gradient-to-r from-pink-500 to-red-500 text-white'
				: 'bg-gray-100 text-gray-700'}"
			on:click={() => (activeTab = 'payouts')}
		>
			Payouts
		</button>
		<button
			class="rounded-xl px-5 py-2 text-sm font-semibold shadow-md
             transition hover:scale-105 hover:shadow-lg
             {activeTab === 'income'
				? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white'
				: 'bg-gray-100 text-gray-700'}"
			on:click={() => (activeTab = 'income')}
		>
			Income
		</button>
	</div>

	{#if activeTab === 'payouts'}
		<Payouts />
	{:else if activeTab === 'income'}
		<Income />
	{/if}
</div>
