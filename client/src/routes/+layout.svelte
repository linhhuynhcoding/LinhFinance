<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { page } from '$app/stores';
	$: url = $page.url; // reactive
</script>

<div class="flex h-screen bg-gray-50">
	<Sidebar {url} />

	<main class="flex-1 overflow-y-auto p-6">
		<slot />
	</main>
</div>
