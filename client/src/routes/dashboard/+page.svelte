<script lang="ts">
	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		ArcElement,
		CategoryScale,
		LinearScale,
		BarElement
	} from 'chart.js';
	import { Doughnut, Bar } from 'svelte-chartjs';

	export let data;

	// Register chart.js modules
	ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale, BarElement);

	const formatCurrency = (value: number) =>
		new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);

	// Pie chart (Income vs Expenses)
	const pieData = {
		labels: ['Income', 'Expenses'],
		datasets: [
			{
				data: [data.stats.income, data.stats.expenses],
				backgroundColor: ['#22c55e', '#ef4444'],
				hoverOffset: 6
			}
		]
	};

	const pieOptions: {
		responsive: boolean;
		plugins: { legend: { position: 'bottom' } };
	} = {
		responsive: true,
		plugins: { legend: { position: 'bottom' } }
	};

	// Bar chart (Balance, Income, Expenses)
	const barData = {
		labels: ['Balance', 'Income', 'Expenses'],
		datasets: [
			{
				label: 'Amount',
				data: [data.stats.balance, data.stats.income, data.stats.expenses],
				backgroundColor: ['#6366f1', '#22c55e', '#ef4444']
			}
		]
	};

	const barOptions = {
		responsive: true,
		plugins: { legend: { display: false } },
		scales: { y: { beginAtZero: true } }
	};
</script>

<h1 class="mb-6 text-3xl font-extrabold tracking-tight text-gray-800">📊 Dashboard</h1>

<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
	<!-- Balance -->
	<div class="rounded-2xl bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 text-white shadow-lg">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-medium opacity-80">Balance</h2>
			<span class="text-lg">💰</span>
		</div>
		<p class="mt-2 text-2xl font-bold">{formatCurrency(data.stats.balance)}</p>
	</div>

	<!-- Income -->
	<div class="rounded-2xl bg-gradient-to-br from-green-500 to-green-600 p-6 text-white shadow-lg">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-medium opacity-80">Income</h2>
			<span class="text-lg">📈</span>
		</div>
		<p class="mt-2 text-2xl font-bold">{formatCurrency(data.stats.income)}</p>
	</div>

	<!-- Expenses -->
	<div class="rounded-2xl bg-gradient-to-br from-red-500 to-red-600 p-6 text-white shadow-lg">
		<div class="flex items-center justify-between">
			<h2 class="text-sm font-medium opacity-80">Expenses</h2>
			<span class="text-lg">📉</span>
		</div>
		<p class="mt-2 text-2xl font-bold">{formatCurrency(data.stats.expenses)}</p>
	</div>
</div>

<!-- Charts -->
<div class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
	<div class="rounded-2xl bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold text-gray-700">Income vs Expenses</h2>
		<!-- <Doughnut data={pieData} options={pieOptions} /> -->
	</div>

	<div class="rounded-2xl bg-white p-6 shadow">
		<h2 class="mb-4 text-lg font-semibold text-gray-700">Overview</h2>
		<Bar data={barData} options={barOptions} />
	</div>
</div>
