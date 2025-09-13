<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';
	import { Motion } from 'svelte-motion'; // ✅ thay framer-motion

	// svelte-ignore non_reactive_update
	let payoutForm: any = {
		title: '',
		amount: 0,
		account_id: '',
		type_id: '',
		purpose_id: '',
		tags: [],
		notes: '',
		date: new Date().toISOString().slice(0, 10),
		account_name: '',
		type_name: '',
		purpose_name: ''
	};

	let accounts = [
		{ id: 1, name: 'Ví MoMo' },
		{ id: 2, name: 'Ngân hàng ACB' }
	];
	let spendTypes = [
		{ id: 1, name: 'Ăn uống' },
		{ id: 2, name: 'Di chuyển' }
	];
	let purposes = [
		{ id: 1, name: 'Công việc' },
		{ id: 2, name: 'Giải trí' }
	];
	let tags = ['Coffee', 'Grab', 'Food'];

	let recentPayouts = [
		{
			id: 1,
			title: 'Cà phê',
			type: 'Ăn uống',
			amount: 45000,
			account: 'Ví MoMo',
			purpose: 'Giải trí',
			tags: ['Coffee'],
			date: '2025-09-01'
		},
		{
			id: 2,
			title: 'Grab đi làm',
			type: 'Di chuyển',
			amount: 70000,
			account: 'Ngân hàng ACB',
			purpose: 'Công việc',
			tags: ['Grab'],
			date: '2025-09-02'
		}
	];

	function addPayout() {
		if (!payoutForm.title || !payoutForm.amount) return;
		recentPayouts.unshift({
			id: recentPayouts.length + 1,
			title: payoutForm.title,
			type: spendTypes.find((t) => t.id == +payoutForm.type_id)?.name || '',
			amount: payoutForm.amount,
			account: accounts.find((a) => a.id == +payoutForm.account_id)?.name || '',
			purpose: purposes.find((p) => p.id == +payoutForm.purpose_id)?.name || '',
			tags: payoutForm.tags,
			date: payoutForm.date
		});
		payoutForm = {
			title: '',
			amount: 0,
			account_id: '',
			type_id: '',
			purpose_id: '',
			tags: [],
			notes: '',
			date: new Date().toISOString().slice(0, 10)
		};
	}

	$: triggerContent = accounts.find((f) => f.id == payoutForm.account_id)?.name ?? 'Select Account';
</script>

<div class="space-y-8">
	<Card class="border border-red-200 shadow-lg">
		<CardHeader>
			<CardTitle class="text-red-600">➖ Track Payout</CardTitle>
		</CardHeader>
		<CardContent>
			<!-- svelte-ignore event_directive_deprecated -->
			<form class="grid grid-cols-2 gap-4" on:submit|preventDefault={addPayout}>
				<Input placeholder="Title" bind:value={payoutForm.title} />
				<Input type="number" placeholder="Amount" bind:value={payoutForm.amount} />

				<Select type="single" bind:value={payoutForm.account_id}>
					<SelectTrigger placeholder="Select Account">
						{accounts.find((f) => f.id == +payoutForm.account_id)?.name ?? 'Select Account'}
					</SelectTrigger>
					<SelectContent>
						{#each accounts as acc}
							<SelectItem value={String(acc.id)} label={acc.name}>{acc.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Select type="single" bind:value={payoutForm.type_id}>
					<SelectTrigger placeholder="Select Type" />
					<SelectContent>
						{#each spendTypes as t}
							<SelectItem value={String(t.id)}>{t.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Select type="single" bind:value={payoutForm.purpose_id}>
					<SelectTrigger placeholder="Select Purpose" />
					<SelectContent>
						{#each purposes as p}
							<SelectItem value={String(p.id)}>{p.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Input type="date" bind:value={payoutForm.date} class="col-span-1" />
				<Textarea placeholder="Notes" bind:value={payoutForm.notes} class="col-span-2" />

				<div class="col-span-2 flex flex-wrap gap-2">
					{#each tags as t}
						<Badge
							class="cursor-pointer"
							variant={payoutForm.tags.includes(t) ? 'default' : 'outline'}
							onclick={() => {
								if (payoutForm.tags.includes(t))
									payoutForm.tags = payoutForm.tags.filter((tag: any) => tag !== t);
								else payoutForm.tags = [...payoutForm.tags, t];
							}}>{t}</Badge
						>
					{/each}
				</div>

				<Button type="submit" class="col-span-2 bg-red-500 hover:bg-red-600">Add Payout</Button>
			</form>
		</CardContent>
	</Card>

	<Card class="border border-gray-200 shadow-lg">
		<CardHeader><CardTitle>📉 Recent Payouts</CardTitle></CardHeader>
		<CardContent>
			<table class="w-full text-sm">
				<thead>
					<tr class="bg-gray-50 text-gray-600">
						<th class="p-2 text-left">Title</th>
						<th class="p-2">Type</th>
						<th class="p-2">Amount</th>
						<th class="p-2">Account</th>
						<th class="p-2">Purpose</th>
						<th class="p-2">Tags</th>
						<th class="p-2">Date</th>
					</tr>
				</thead>
				<tbody>
					{#each recentPayouts as item}
						<Motion
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}
						>
							<td class="p-2">{item.title}</td>
							<td class="p-2">{item.type}</td>
							<td class="p-2 font-semibold text-red-600">-{item.amount.toLocaleString()} VND</td>
							<td class="p-2">{item.account}</td>
							<td class="p-2">{item.purpose}</td>
							<td class="p-2">
								{#each item.tags as t}
									<Badge variant="outline" class="mr-1">{t}</Badge>
								{/each}
							</td>
							<td class="p-2">{item.date}</td>
						</Motion>
					{/each}
				</tbody>
			</table>
		</CardContent>
	</Card>
</div>
