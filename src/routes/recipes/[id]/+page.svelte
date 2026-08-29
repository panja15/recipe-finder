<script lang="ts">
	import { isFavorite, toggleFavorite } from '$lib/stores/favorites.svelte.js';
	import { days, assignMeal, type Day } from '$lib/stores/mealPlan.svelte';
	import { showToast } from '$lib/stores/toast.svelte';

	let { data } = $props();

	let showPlanner = $state(false);
	let selectedDay = $state<Day | ''>('');

	function addToMealPlan() {
		if (!selectedDay) {
			return;
		}

		assignMeal(selectedDay, data.recipe);
		showToast(`📅 Added "${data.recipe.strMeal}" to ${selectedDay}!`, 'success');

		showPlanner = false;
		selectedDay = '';
	}

	function handleFavorite(event: CustomEvent<string>) {
		event.preventDefault();

		toggleFavorite(data.recipe);
	}
</script>

<svelte:head>
	<title>{data.recipe.strMeal} | Recipe Finder</title>
</svelte:head>

<article class="recipe-detail">
	<a href="/" class="back-link">← Back to recipes</a>

	<div class="header">
		<div class="title-bar">
			<h1>{data.recipe.strMeal}</h1>

			<favorite-button
				recipeId={data.recipe.idMeal}
				isFavorite={isFavorite(data.recipe.idMeal)}
				onfavoriteToggle={handleFavorite}
			></favorite-button>
		</div>

		<div class="meta-badges">
			{#if data.recipe.strCategory}
				<span class="badge">📁 {data.recipe.strCategory}</span>
			{/if}

			{#if data.recipe.strArea}
				<span class="badge badge-secondary">🌐 {data.recipe.strArea}</span>
			{/if}
		</div>
	</div>

	<div class="image-wrapper">
		<img src={data.recipe.strMealThumb} alt={data.recipe.strMeal} />
	</div>

	<div class="actions">
		<button class="btn-primary" onclick={() => (showPlanner = true)}> 📅 Add to Meal Plan </button>
	</div>

	{#if data.recipe.ingredients && data.recipe.ingredients.length > 0}
		<section class="ingredients">
			<h2>Ingredients 🥗</h2>

			<ul class="ingredients-list">
				{#each data.recipe.ingredients as ingredient (ingredient.name)}
					<li class="ingredient-item">
						<span class="ingredient-dot"></span>
						{#if ingredient.measure}
							<strong class="measure">{ingredient.measure}</strong>
						{/if}
						<span class="name">{ingredient.name}</span>
					</li>
				{/each}
			</ul>
		</section>
	{/if}
	
	<section class="instructions">
		<h2>Instructions</h2>
		<p>{data.recipe.strInstructions}</p>
	</section>


	{#if showPlanner}
		<div class="modal-backdrop">
			<div class="modal">
				<button class="close" onclick={() => (showPlanner = false)} aria-label="Close modal">
					×
				</button>

				<h2>Add to Meal Plan</h2>

				<p class="modal-desc">
					Choose a day for <strong>{data.recipe.strMeal}</strong>.
				</p>

				<select bind:value={selectedDay}>
					<option value=""> Select a day </option>

					{#each days as day (day)}
						<option value={day}>
							{day}
						</option>
					{/each}
				</select>

				<button class="btn-modal-submit" onclick={addToMealPlan} disabled={!selectedDay}>
					Add Meal
				</button>
			</div>
		</div>
	{/if}
</article>

<style>
	.recipe-detail {
		max-width: 800px;
		margin: 0 auto;
	}

	.back-link {
		display: inline-flex;
		align-items: center;
		color: var(--color-text-muted, #666666);
		font-size: 0.9rem;
		font-weight: 600;
		text-decoration: none;
		margin-bottom: 1.5rem;
		transition: color 0.2s ease;
	}

	.back-link:hover {
		color: var(--color-primary, #e65100);
	}

	.header {
		margin-bottom: 1.5rem;
	}

	.title-bar {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		gap: 1rem;
		margin-bottom: 0.75rem;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 800;
		letter-spacing: -0.03em;
		color: var(--color-text, #1a1a1a);
		line-height: 1.2;
	}

	.meta-badges {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}

	.badge {
		font-size: 0.85rem;
		font-weight: 700;
		padding: 0.35rem 0.85rem;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary-light, #fff3e0);
		color: var(--color-primary, #e65100);
	}

	.badge-secondary {
		background-color: var(--color-surface-hover, #f5f4f0);
		color: var(--color-text-muted, #666666);
	}

	.image-wrapper {
		border-radius: var(--radius-lg, 18px);
		overflow: hidden;
		margin-bottom: 2rem;
		box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.06));
		border: 1px solid var(--color-border-light, #f0eee8);
	}

	.image-wrapper img {
		width: 100%;
		max-height: 480px;
		object-fit: cover;
		display: block;
	}

	.actions {
		margin-bottom: 2.5rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.85rem 1.75rem;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary, #e65100);
		color: white;
		font-size: 1rem;
		font-weight: 700;
		border: none;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(230, 81, 0, 0.25);
	}

	.btn-primary:hover {
		background-color: var(--color-primary-hover, #cc4500);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(230, 81, 0, 0.35);
	}

	.ingredients {
		background: var(--color-surface, #ffffff);
		border-radius: var(--radius-lg, 18px);
		padding: 2rem;
		border: 1px solid var(--color-border, #e5e3dd);
		box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.03));
		margin-bottom: 2rem;
	}

	.ingredients h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
		margin-bottom: 1.25rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-border-light, #f0eee8);
	}

	.ingredients-list {
		list-style: none;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
		gap: 0.75rem 1rem;
		padding: 0;
		margin: 0;
	}

	.ingredient-item {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		padding: 0.65rem 0.85rem;
		border-radius: var(--radius-sm, 8px);
		background-color: var(--color-bg, #faf9f6);
		border: 1px solid var(--color-border-light, #f0eee8);
		font-size: 0.925rem;
		line-height: 1.3;
	}

	.ingredient-dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--color-primary, #e65100);
		flex-shrink: 0;
	}

	.measure {
		color: var(--color-primary, #e65100);
		font-weight: 700;
	}

	.name {
		color: var(--color-text, #1a1a1a);
	}

	.instructions {
		background: var(--color-surface, #ffffff);
		border-radius: var(--radius-lg, 18px);
		padding: 2rem;
		border: 1px solid var(--color-border, #e5e3dd);
		box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.03));
	}

	.instructions h2 {
		font-size: 1.5rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
		margin-bottom: 1rem;
		padding-bottom: 0.5rem;
		border-bottom: 2px solid var(--color-border-light, #f0eee8);
	}

	.instructions p {
		color: var(--color-text, #1a1a1a);
		line-height: 1.8;
		font-size: 1.05rem;
		white-space: pre-line;
	}

	.modal-backdrop {
		position: fixed;
		inset: 0;
		z-index: 200;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(0, 0, 0, 0.45);
		backdrop-filter: blur(6px);
		-webkit-backdrop-filter: blur(6px);
		padding: 1rem;
	}

	.modal {
		position: relative;
		width: min(450px, 100%);
		padding: 2.25rem;
		border-radius: var(--radius-lg, 18px);
		background: var(--color-surface, #ffffff);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		border: 1px solid var(--color-border-light, #f0eee8);
	}

	.close {
		position: absolute;
		top: 1.25rem;
		right: 1.25rem;
		width: 36px;
		height: 36px;
		border: none;
		border-radius: 50%;
		background: var(--color-surface-hover, #f5f4f0);
		font-size: 1.5rem;
		color: var(--color-text-muted, #666666);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.close:hover {
		background: var(--color-border, #e5e3dd);
		color: var(--color-text, #1a1a1a);
	}

	.modal h2 {
		font-size: 1.35rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--color-text, #1a1a1a);
	}

	.modal-desc {
		color: var(--color-text-muted, #666666);
		font-size: 0.95rem;
		margin-bottom: 1.25rem;
	}

	select {
		display: block;
		width: 100%;
		margin-bottom: 1.5rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-sm, 8px);
		font-family: inherit;
		font-size: 0.95rem;
		color: var(--color-text, #1a1a1a);
		background-color: var(--color-surface, #ffffff);
	}

	select:focus {
		outline: none;
		border-color: var(--color-primary, #e65100);
	}

	.btn-modal-submit {
		width: 100%;
		padding: 0.85rem;
		border-radius: var(--radius-full, 9999px);
		border: none;
		background-color: var(--color-primary, #e65100);
		color: white;
		font-size: 0.95rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-modal-submit:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.btn-modal-submit:not(:disabled):hover {
		background-color: var(--color-primary-hover, #cc4500);
	}

	@media (max-width: 600px) {
		h1 {
			font-size: 1.85rem;
		}

		.instructions {
			padding: 1.25rem;
		}
	}
</style>
