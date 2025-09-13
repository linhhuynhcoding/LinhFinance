<script lang="ts">
	import Card from './Card.svelte';

	export let data: {
		account: string;
		date: string;
		status: string;
		payee: string;
		category: string;
		amount: number;
	}[];
</script>

<Card title="Transactions">
	<table class="w-full text-sm">
		<thead class="text-left text-gray-500">
			<tr>
				<th class="py-2">Account</th>
				<th>Date</th>
				<th>Status</th>
				<th>Payee</th>
				<th>Category</th>
				<th>Amount</th>
			</tr>
		</thead>
		<tbody>
			{#each data as tx}
				<tr class="border-t">
					<td class="py-2">{tx.account}</td>
					<td>{tx.date}</td>
					<td>{tx.status}</td>
					<td>{tx.payee}</td>
					<td>{tx.category}</td>
					<td>${tx.amount.toFixed(2)}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</Card>
