<script lang="ts">
	import Card from './Card.svelte';

	export let data: { label: string; value: number }[];
</script>

<Card title="Other spending">
	<div class="flex justify-center gap-4">
		{#each data as item}
			<div
				class="flex h-24 w-24 items-center justify-center rounded-full text-lg font-bold
                  {item.label === 'Fitness' ? 'bg-blue-200' : 'bg-orange-200'}"
			>
				{item.value}
			</div>
		{/each}
	</div>
	<ul class="mt-4 text-sm">
		{#each data as item}
			<li class="flex justify-between">
				<span>{item.label}</span><span>${item.value.toFixed(2)}</span>
			</li>
		{/each}
	</ul>
</Card>
