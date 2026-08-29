<!-- <script lang="ts">
	import type { Recipe } from '$lib/types/recipe';
	import { isFavorite, toggleFavorite } from '$lib/stores/favorites.svelte';

	let { recipe } = $props<{
		recipe: Recipe;
	}>();

	function handleFavorite(event: MouseEvent) {
		event.preventDefault();
		event.stopPropagation();

		toggleFavorite(recipe);
	}
</script>

<article>
	<div class="card">
		<a href={`/recipes/${recipe.idMeal}`}>
			<div class="image-container">
				<img src={recipe.strMealThumb} alt={recipe.strMeal} width="200" />

				<button
					class:active={isFavorite(recipe.idMeal)}
					id="favorite-button"
					onclick={handleFavorite}
					aria-label="Toggle favorite"
				>
					{isFavorite(recipe.idMeal) ? '♥️' : '♡︎'}
				</button>
			</div>

			<div class="content">
				<h3>{recipe.strMeal}</h3>

				{#if recipe.strCategory}
					<span>{recipe.strCategory}</span>
				{/if}
			</div>
		</a>
	</div>
</article>

<style>
	article {
		overflow: hidden;
		border: 1px solid #ddd;
		border-radius: 12px;
		background: white;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	article:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
	}

	.card {
		display: block;
		text-decoration: none;
	}

	a {
		text-decoration: none;
		color: inherit;
	}

	.image-container {
		position: relative;
	}

	img {
		display: block;
		width: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}

	.content {
		padding: 1rem;
	}

	h3 {
		margin: 0 0 0.5rem;
	}

	span {
		font-size: 0.85rem;
		color: #666;
	}

	#favorite-button {
		position: absolute;
		top: 10px;
		right: 10px;

		width: 40px;
		height: 40px;

		border: none;
		border-radius: 50%;

		background: white;
		font-size: 1.4rem;

		cursor: pointer;
	}

	#favorite-button.active {
		background: #ffe5e5;
	}
</style> -->
