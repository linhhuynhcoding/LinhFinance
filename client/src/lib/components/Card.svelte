<script lang="ts">
	export let title: string;
	export let className: string = '';
</script>

<div class={`rounded-xl bg-white p-4 shadow ${className}`}>
	<h2 class="mb-2 text-sm font-semibold text-gray-600">{title}</h2>
	<slot />
</div>
