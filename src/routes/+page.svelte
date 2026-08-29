<script lang="ts">
	import type { Recipe } from '$lib/types/recipe';
	import { searchMeals } from '$lib/api/meals';

	import RecipeGrid from '$lib/components/RecipeGrid.svelte';

	let recipes = $state<Recipe[]>([]);
	let searchQuery = $state('');
	let loading = $state(false);
	let error = $state('');
	let hasSearched = $state(false);
	let selectedCategory = $state('All');
	let selectedArea = $state('All');

	let categories = $derived([
		'All',
		...new Set(recipes.map((recipe) => recipe.strCategory).filter(Boolean))
	]);

	let areas = $derived([
		'All',
		...new Set(recipes.map((recipe) => recipe.strArea).filter(Boolean))
	]);

	let filteredRecipes = $derived(
		recipes.filter((recipe) => {
			const categoryMatches = selectedCategory === 'All' || recipe.strCategory === selectedCategory;

			const areaMatches = selectedArea === 'All' || recipe.strArea === selectedArea;

			return categoryMatches && areaMatches;
		})
	);

	async function searchRecipes() {
		console.log('Searching for:', searchQuery);

		if (!searchQuery.trim()) {
			return;
		}

		selectedCategory = 'All';
		loading = true;

		try {
			recipes = await searchMeals(searchQuery);
		} catch (err) {
			error = 'Unable to load recipes.';
			console.log(err);
		} finally {
			loading = false;
		}
	}

	function handleSearch(event: CustomEvent<string>) {
		const query = event.detail;
		searchQuery = query;

		searchRecipes();
	}
</script>

<svelte:head>
	<title>Recipe Finder</title>
	<meta name="description" content="Find delicious recipes and plan your meals." />
</svelte:head>

<section class="hero">
	<div class="badge">Discover & Plan</div>
	<h1>Find your next meal 🍳</h1>
	<p class="subtitle">Search thousands of recipes and discover something delicious.</p>

	<div class="search-container">
		<recipe-search placeholder="Search recipes..." onsearch={handleSearch}></recipe-search>
	</div>
</section>

<section class="results">
	{#if loading}
		<div class="state-card loading-state">
			<div class="spinner"></div>
			<p>Searching for delicious recipes...</p>
		</div>
	{:else if error}
		<div class="state-card error-state">
			<p>⚠️ {error}</p>
		</div>
	{:else if recipes.length > 0}
		<div class="results-header">
			{#if categories.length > 1}
				<div class="filters">
					<div class="filter">
						<label for="category-filter">Category</label>

						<select id="category-filter" bind:value={selectedCategory}>
							{#each categories as category (category)}
								<option value={category}>{category}</option>
							{/each}
						</select>
					</div>

					<div class="filter">
						<label for="area-filter">Cuisine</label>

						<select id="area-filter" bind:value={selectedArea}>
							{#each areas as area (area)}
								<option value={area}>{area}</option>
							{/each}
						</select>
					</div>
				</div>
			{/if}
		</div>

		{#if filteredRecipes.length > 0}
			<RecipeGrid recipes={filteredRecipes} />
		{:else}
			<div class="state-card empty-state">
				<p>
					No recipes found in the <strong>{selectedCategory}</strong> category.
				</p>
			</div>
		{/if}
	{:else if hasSearched}
		<div class="state-card empty-state">
			<p>🔍 No recipes found for "<strong>{searchQuery}</strong>". Try another keyword!</p>
		</div>
	{:else}
		<div class="state-card prompt-state">
			<p>💡 Search for something like <em>chicken</em>, <em>pasta</em>, or <em>pizza</em>.</p>
		</div>
	{/if}
</section>

<style>
	.hero {
		text-align: center;
		padding: 3rem 1rem 2.5rem;
		max-width: 800px;
		margin: 0 auto;
	}

	.badge {
		display: inline-block;
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary-light, #fff3e0);
		color: var(--color-primary, #e65100);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.05em;
		text-transform: uppercase;
		margin-bottom: 1rem;
	}

	.hero h1 {
		font-size: 2.75rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		margin-bottom: 0.75rem;
		color: var(--color-text, #1a1a1a);
		line-height: 1.2;
	}

	.hero .subtitle {
		font-size: 1.15rem;
		color: var(--color-text-muted, #666666);
		margin-bottom: 2rem;
	}

	.search-container {
		max-width: 620px;
		margin: 0 auto;
	}

	.results {
		margin-top: 1rem;
	}

	.state-card {
		text-align: center;
		padding: 3rem 2rem;
		border-radius: var(--radius-md, 12px);
		background: var(--color-surface, #ffffff);
		border: 1px dashed var(--color-border, #e5e3dd);
		margin: 2rem 0;
		color: var(--color-text-muted, #666666);
		font-size: 1.05rem;
	}

	.loading-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}

	.spinner {
		width: 32px;
		height: 32px;
		border: 3px solid var(--color-primary-light, #fff3e0);
		border-top-color: var(--color-primary, #e65100);
		border-radius: 50%;
		animation: spin 0.8s linear infinite;
	}

	@keyframes spin {
		to {
			transform: rotate(360deg);
		}
	}

	.error-state {
		border-color: #ffcdd2;
		background: #ffebee;
		color: var(--color-danger, #d32f2f);
	}

	@media (max-width: 640px) {
		.hero {
			padding: 1.5rem 0.5rem 1.5rem;
		}

		.hero h1 {
			font-size: 2rem;
		}

		.hero .subtitle {
			font-size: 1rem;
		}
	}

	.results-header {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		margin-bottom: 1.5rem;
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1.25rem;
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-lg, 18px);
		box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.03));
	}

	.filter {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.filters label {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-text-muted, #666666);
		white-space: nowrap;
	}

	.filters select {
		padding: 0.45rem 2rem 0.45rem 0.85rem;
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-full, 9999px);
		background: var(--color-bg, #faf9f6);
		color: var(--color-text, #1a1a1a);
		font-family: inherit;
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.filters select:hover {
		border-color: var(--color-primary, #e65100);
	}

	.filters select:focus {
		outline: none;
		border-color: var(--color-primary, #e65100);
		box-shadow: 0 0 0 3px rgba(230, 81, 0, 0.12);
	}

	@media (max-width: 640px) {
		.filters {
			width: 100%;
			justify-content: space-between;
			gap: 0.75rem;
			padding: 0.75rem 1rem;
		}

		.filter {
			flex: 1;
			min-width: 120px;
			justify-content: space-between;
		}

		.filter select {
			width: 100%;
		}
	}
</style>
