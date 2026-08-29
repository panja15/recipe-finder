<script lang="ts">
	import type { Recipe } from '$lib/types/recipe';
	import { getFavorites, isFavorite, toggleFavorite } from '$lib/stores/favorites.svelte';
	// import RecipeCard from './RecipeCard.svelte';

	let { recipes } = $props<{ recipes: Recipe[] }>();

	let favorites = getFavorites();

	function handleFavorite(event: CustomEvent<string>) {
		event.preventDefault();
		event.stopPropagation();

		const recipe = recipes.find((recipe: Recipe) => recipe.idMeal === event.detail);

		if (recipe) {
			toggleFavorite(recipe);
		}
	}

	function handleLinkClick(event: MouseEvent) {
		const path = event.composedPath();
		const isButtonClick = path.some(
			(node) => node instanceof HTMLElement && node.localName === 'button'
		);

		if (isButtonClick) {
			event.preventDefault();
		}
	}
</script>

<div class="grid">
	{#each recipes as recipe (recipe.idMeal)}
		<!-- <RecipeCard {recipe} />\ -->

		<a href={`/recipes/${recipe.idMeal}`} aria-label={recipe.strMeal} onclick={handleLinkClick}>
			<recipe-card
				recipeId={recipe.idMeal}
				name={recipe.strMeal}
				image={recipe.strMealThumb}
				category={recipe.strCategory}
				isFavorite={isFavorite(recipe.idMeal)}
				onfavoriteToggle={handleFavorite}
			>
				<span slot="footer">
					{recipe.strArea ?? ''}
				</span>
			</recipe-card>
		</a>
	{/each}
</div>

<style>
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
		gap: 1.75rem;
		margin-top: 1.5rem;
	}

	.grid a {
		text-decoration: none;
		color: inherit;
		display: block;
		height: 100%;
		transition: transform 0.2s ease;
	}

	.grid a:hover {
		transform: translateY(-4px);
	}

	@media (max-width: 500px) {
		.grid {
			grid-template-columns: 1fr;
			gap: 1.25rem;
		}
	}
</style>
