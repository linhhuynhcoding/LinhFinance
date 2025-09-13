<script lang="ts">
	import Card from '$lib/components/Card.svelte';
</script>

<div class="grid grid-cols-3 gap-6">
	<!-- Income & Spending -->
	<Card title="Income after bills & savings">
		<p class="text-2xl font-semibold">$6,788.21</p>
		<p class="text-sm text-gray-500">Available</p>
	</Card>

	<Card title="Planned Spending">
		<p class="text-2xl font-semibold">$0.00</p>
	</Card>

	<Card title="Other Spending">
		<p class="text-2xl font-semibold">$1,531.54</p>
	</Card>
</div>

<div class="mt-6 grid grid-cols-3 gap-6">
	<!-- Chart -->
	<Card title="Other spending">
		<div class="flex justify-center">
			<div
				class="flex h-32 w-32 items-center justify-center rounded-full bg-blue-200 text-lg font-bold"
			>
				67%
			</div>
			<div
				class="-ml-6 flex h-24 w-24 items-center justify-center rounded-full bg-orange-200 text-lg font-bold"
			>
				33%
			</div>
		</div>
		<ul class="mt-4 text-sm">
			<li class="flex justify-between"><span>Fitness</span><span>$89.00</span></li>
			<li class="flex justify-between"><span>Uncategories</span><span>$45.00</span></li>
		</ul>
	</Card>

	<!-- Transactions -->
	<Card title="Transactions" className="col-span-2">
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
				<tr class="border-t">
					<td class="py-2">REITS</td>
					<td>07 Mar</td>
					<td>-</td>
					<td>Opening Balance</td>
					<td>Groceries</td>
					<td>$100.00</td>
				</tr>
				<tr class="border-t">
					<td>WISE</td>
					<td>08 Mar</td>
					<td>-</td>
					<td>Opening Balance</td>
					<td>Birthday</td>
					<td>$100.00</td>
				</tr>
			</tbody>
		</table>
	</Card>
</div>
