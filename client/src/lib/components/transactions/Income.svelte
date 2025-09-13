<script lang="ts">
	import { Card, CardHeader, CardTitle, CardContent } from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Textarea } from '$lib/components/ui/textarea';
	import { Button } from '$lib/components/ui/button';
	import { Select, SelectContent, SelectItem, SelectTrigger } from '$lib/components/ui/select';
	import { Badge } from '$lib/components/ui/badge';
	import { Motion } from 'svelte-motion'; // ✅ thay framer-motion

	let incomeForm = {
		title: '',
		amount: 0,
		account_id: '',
		type_id: '',
		purpose_id: '',
		tags: [] as string[],
		notes: '',
		date: new Date().toISOString().slice(0, 10)
	};

	// Mock data
	let accounts = [
		{ id: 1, name: 'Techcombank' },
		{ id: 2, name: 'ShopeePay' }
	];
	let incomeTypes = [
		{ id: 1, name: 'Lương' },
		{ id: 2, name: 'Freelance' }
	];
	let purposes = [
		{ id: 1, name: 'Tiết kiệm' },
		{ id: 2, name: 'Chi tiêu' }
	];
	let tags = ['Salary', 'Bonus', 'Freelance'];

	let recentIncomes = [
		{
			id: 1,
			title: 'Lương tháng 8',
			type: 'Lương',
			amount: 12000000,
			account: 'Techcombank',
			purpose: 'Tiết kiệm',
			tags: ['Salary'],
			date: '2025-09-01'
		},
		{
			id: 2,
			title: 'Freelance Web',
			type: 'Freelance',
			amount: 3000000,
			account: 'ShopeePay',
			purpose: 'Chi tiêu',
			tags: ['Freelance'],
			date: '2025-09-02'
		}
	];

	function addIncome() {
		if (!incomeForm.title || !incomeForm.amount) return;
		recentIncomes.unshift({
			id: recentIncomes.length + 1,
			title: incomeForm.title,
			type: incomeTypes.find((t) => t.id == +incomeForm.type_id)?.name || '',
			amount: incomeForm.amount,
			account: accounts.find((a) => a.id == +incomeForm.account_id)?.name || '',
			purpose: purposes.find((p) => p.id == +incomeForm.purpose_id)?.name || '',
			tags: incomeForm.tags,
			date: incomeForm.date
		});
		incomeForm = {
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
</script>

<div class="space-y-8">
	<Card class="border border-green-200 shadow-lg">
		<CardHeader>
			<CardTitle class="text-green-600">➕ Track Income</CardTitle>
		</CardHeader>
		<CardContent>
			<form class="grid grid-cols-2 gap-4" on:submit|preventDefault={addIncome}>
				<Input placeholder="Title" bind:value={incomeForm.title} />
				<Input type="number" placeholder="Amount" bind:value={incomeForm.amount} />

				<Select type="single" bind:value={incomeForm.account_id}>
					<SelectTrigger placeholder="Select Account"></SelectTrigger>
					<SelectContent>
						{#each accounts as acc}
							<SelectItem value={String(acc.id)}>{acc.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Select type="single" bind:value={incomeForm.type_id}>
					<SelectTrigger placeholder="Select Type"></SelectTrigger>
					<SelectContent>
						{#each incomeTypes as t}
							<SelectItem value={String(t.id)}>{t.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Select type="single" bind:value={incomeForm.purpose_id}>
					<SelectTrigger placeholder="Select Purpose"></SelectTrigger>
					<SelectContent>
						{#each purposes as p}
							<SelectItem value={String(p.id)}>{p.name}</SelectItem>
						{/each}
					</SelectContent>
				</Select>

				<Input type="date" bind:value={incomeForm.date} class="col-span-1" />
				<Textarea placeholder="Notes" bind:value={incomeForm.notes} class="col-span-2" />

				<div class="col-span-2 flex flex-wrap gap-2">
					{#each tags as t}
						<Badge
							class="cursor-pointer"
							variant={incomeForm.tags.includes(t) ? 'default' : 'outline'}
							onclick={() => {
								if (incomeForm.tags.includes(t))
									incomeForm.tags = incomeForm.tags.filter((tag) => tag !== t);
								else incomeForm.tags = [...incomeForm.tags, t];
							}}>{t}</Badge
						>
					{/each}
				</div>

				<Button type="submit" class="col-span-2 bg-green-500 hover:bg-green-600">Add Income</Button>
			</form>
		</CardContent>
	</Card>

	<Card class="border border-gray-200 shadow-lg">
		<CardHeader><CardTitle>📈 Recent Incomes</CardTitle></CardHeader>
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
					{#each recentIncomes as item}
						<Motion
							initial={{ opacity: 0, y: -10 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.2 }}
						>
							<td class="p-2">{item.title}</td>
							<td class="p-2">{item.type}</td>
							<td class="p-2 font-semibold text-green-600">+{item.amount.toLocaleString()} VND</td>
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
