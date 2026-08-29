<script lang="ts">
	import '$lib/stencil';
	
	import favicon from '$lib/assets/favicon.svg';
	import { loadFavorites } from '$lib/stores/favorites.svelte';
	import { loadCustomRecipes } from '$lib/stores/customRecipes.svelte';
	import { loadMealPlan } from '$lib/stores/mealPlan.svelte';

	import Navbar from '$lib/components/Navbar.svelte';
	import Toast from '$lib/components/Toast.svelte';

	loadFavorites();
	loadCustomRecipes();
	loadMealPlan();

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Navbar />

<main class="app-container">
	{@render children()}
</main>

<Toast />

<style>
	:global(:root) {
		--font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
		
		--color-primary: #e65100;
		--color-primary-hover: #cc4500;
		--color-primary-light: #fff3e0;
		
		--color-bg: #faf9f6;
		--color-surface: #ffffff;
		--color-surface-hover: #f5f4f0;
		
		--color-text: #1a1a1a;
		--color-text-muted: #666666;
		--color-text-light: #888888;
		
		--color-border: #e5e3dd;
		--color-border-light: #f0eee8;
		
		--color-danger: #d32f2f;
		--color-danger-hover: #b71c1c;
		--color-danger-light: #ffebee;
		
		--radius-sm: 8px;
		--radius-md: 12px;
		--radius-lg: 18px;
		--radius-full: 9999px;
		
		--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.03);
		--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06);
		--shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.08);
		
		--transition-fast: 0.15s ease;
		--transition-normal: 0.25s ease;
	}

	:global(*) {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}

	:global(body) {
		font-family: var(--font-family);
		background-color: var(--color-bg);
		color: var(--color-text);
		line-height: 1.5;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		min-height: 100vh;
	}

	.app-container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 1.5rem 4rem;
	}

	@media (max-width: 600px) {
		.app-container {
			padding: 0 1rem 3rem;
		}
	}
</style>
