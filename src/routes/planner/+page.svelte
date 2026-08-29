<script lang="ts">
	import type { Recipe } from '$lib/types/recipe';

	import { days, getMealPlan, assignMeal, removeMeal, type Day } from '$lib/stores/mealPlan.svelte';

	import { getFavorites } from '$lib/stores/favorites.svelte';
	import { getCustomRecipes } from '$lib/stores/customRecipes.svelte';
	import { showToast } from '$lib/stores/toast.svelte';

	let mealPlan = $derived(getMealPlan());
	let favorites = $derived(getFavorites());
	let customRecipes = $derived(getCustomRecipes());

	let availableRecipes = $derived(
		[...favorites, ...customRecipes].filter(
			(recipe, index, array) => array.findIndex((item) => item.idMeal === recipe.idMeal) === index
		)
	);

	let selectedDay = $state<Day | null>(null);

	function addMeal(day: Day) {
		selectedDay = day;
	}

	function selectRecipe(recipe: Recipe) {
		if (!selectedDay) {
			return;
		}

		assignMeal(selectedDay, recipe);
		showToast(`📅 Added "${recipe.strMeal}" to ${selectedDay}!`, 'success');
		selectedDay = null;
	}

	function changeMeal(day: Day) {
		selectedDay = day;
	}

	function removePlannedMeal(day: Day) {
		removeMeal(day);
		showToast(`🗑️ Removed meal from ${day}`, 'info');
	}
</script>

<svelte:head>
	<title>Meal Planner | Recipe Finder</title>
</svelte:head>

<section class="planner-page">
	<header>
		<h1>Weekly Meal Planner 📅</h1>
		<p class="subtitle">Plan your meals for the entire week with ease.</p>
	</header>

	<div class="planner">
		{#each days as day (day)}
			<!-- <article class="day">
				<div class="day-header">
					<h2>{day}</h2>
				</div>

				{#if mealPlan[day]}
					<div class="meal">
						<img src={mealPlan[day]?.strMealThumb} alt={mealPlan[day]?.strMeal} />

						<div>
							<h3>
								{mealPlan[day]?.strMeal}
							</h3>

							<button onclick={() => changeMeal(day)}> Change </button>

							<button onclick={() => removePlannedMeal(day)}> Remove </button>
						</div>
					</div>
				{:else}
					<div class="empty">
						<p>No meal planned.</p>

						<button onclick={() => addMeal(day)}> + Add Meal </button>
					</div>
				{/if}
			</article> -->

			<meal-day-card
				{day}
				recipeName={mealPlan[day]?.strMeal ?? ''}
				recipeImage={mealPlan[day]?.strMealThumb ?? ''}
				onmealAdd={() => addMeal(day)}
				onmealRemove={() => removePlannedMeal(day)}
				onmealChange={() => changeMeal(day)}
			></meal-day-card>
		{/each}
	</div>
</section>

{#if selectedDay}
	<div class="modal-backdrop">
		<div class="modal">
			<button class="close" onclick={() => (selectedDay = null)} aria-label="Close modal"> × </button>

			<h2>
				Choose a meal for <span>{selectedDay}</span>
			</h2>

			{#if availableRecipes.length === 0}
				<div class="modal-empty">
					<p>You need to favorite a recipe or create a custom recipe first.</p>
					<a href="/" class="btn-primary"> Find Recipes </a>
				</div>
			{:else}
				<div class="recipe-list">
					{#each availableRecipes as recipe (recipe.idMeal)}
						<button class="recipe-option" onclick={() => selectRecipe(recipe)}>
							<img src={recipe.strMealThumb} alt={recipe.strMeal} />

							<span class="recipe-name">
								{recipe.strMeal}
							</span>
						</button>
					{/each}
				</div>
			{/if}
		</div>
	</div>
{/if}

<style>
	.planner-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	header {
		margin-bottom: 2rem;
		padding-bottom: 1.25rem;
		border-bottom: 2px solid var(--color-border-light, #f0eee8);
	}

	header h1 {
		font-size: 2.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-text, #1a1a1a);
	}

	.subtitle {
		color: var(--color-text-muted, #666666);
		font-size: 1rem;
		margin-top: 0.25rem;
	}

	.planner {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
		gap: 1.5rem;
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
		width: min(550px, 100%);
		max-height: 85vh;
		overflow-y: auto;
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
		color: var(--color-text, #1a1a1a);
		margin-bottom: 1.5rem;
		padding-right: 2rem;
	}

	.modal h2 span {
		color: var(--color-primary, #e65100);
	}

	.modal-empty {
		text-align: center;
		padding: 2rem 1rem;
	}

	.modal-empty p {
		color: var(--color-text-muted, #666666);
		margin-bottom: 1.5rem;
	}

	.btn-primary {
		display: inline-block;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary, #e65100);
		color: white;
		font-weight: 700;
		text-decoration: none;
	}

	.recipe-list {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
	}

	.recipe-option {
		display: flex;
		align-items: center;
		gap: 1rem;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-md, 12px);
		background: var(--color-surface, #ffffff);
		text-align: left;
		cursor: pointer;
		transition: all 0.2s ease;
		width: 100%;
	}

	.recipe-option:hover {
		background: var(--color-primary-light, #fff3e0);
		border-color: var(--color-primary, #e65100);
		transform: translateX(4px);
	}

	.recipe-option img {
		width: 54px;
		height: 54px;
		object-fit: cover;
		border-radius: var(--radius-sm, 8px);
	}

	.recipe-name {
		font-size: 0.95rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
	}

	@media (max-width: 700px) {
		.planner {
			grid-template-columns: 1fr;
		}

		header h1 {
			font-size: 1.75rem;
		}

		.modal {
			padding: 1.5rem;
		}
	}
</style>
