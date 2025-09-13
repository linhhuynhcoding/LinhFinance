<script lang="ts">
	import { ArrowLeftRight, ChartColumnIncreasing, Gauge, Menu } from 'lucide-svelte';
	import type { URL } from 'url';

	export let url: URL;

	let collapsed = true;

	const menu = [
		{ name: 'Dashboard', href: '/dashboard', icon: '📊', Icon: Gauge },
		{ name: 'Spending', href: '/spending', icon: '💸', Icon: ArrowLeftRight },
		{ name: 'Transactions', href: '/transactions', icon: '💳', Icon: ArrowLeftRight },
		{ name: 'Spending plan', href: '/spending-plan', icon: '📅', Icon: ChartColumnIncreasing }
	];

	function toggleCollapse() {
		collapsed = !collapsed;
	}
</script>

<aside
	class="flex flex-col bg-white shadow-sm transition-all duration-300"
	class:w-64={!collapsed}
	class:w-20={collapsed}
>
	<!-- Header -->
	<div class="flex items-center {collapsed ? 'justify-center' : 'justify-between'} px-4 py-4">
		<div class="text-xl font-bold" class:hidden={collapsed}>QuikFin</div>
		<button on:click={toggleCollapse} class="rounded p-2 hover:bg-gray-100">
			<Menu />
		</button>
	</div>

	<!-- Menu -->
	<nav class="flex-1">
		{#each menu as item}
			<a
				href={item.href}
				class="flex items-center gap-4 px-4 py-3 text-sm text-gray-600
				hover:bg-gray-100
				{collapsed ? 'justify-center' : ''}
          {url.pathname.endsWith(item.href) && url.pathname.startsWith(item.href)
					? 'bg-indigo-50 font-semibold text-indigo-600'
					: ''}"
			>
				<!-- <Gauge /> -->
				<svelte:component this={item.Icon} />

				<span class:hidden={collapsed}>{item.name}</span>
			</a>
		{/each}
	</nav>
</aside>
