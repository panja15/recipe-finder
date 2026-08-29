<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	import { getCustomRecipes, updateCustomRecipe } from '$lib/stores/customRecipes.svelte';
	import { showToast } from '$lib/stores/toast.svelte';

	let recipes = $derived(getCustomRecipes());

	const recipeId = page.params.id;

	let recipe = $derived(recipes.find((item) => item.idMeal === recipeId));

	let name = $state('');
	let category = $state('');
	let area = $state('');
	let image = $state('');
	let ingredients = $state('');
	let instructions = $state('');

	let initialized = $state(false);
	let errors = $state<string[]>([]);

	$effect(() => {
		if (recipe && !initialized) {
			name = recipe.strMeal;
			category = recipe.strCategory ?? '';
			area = recipe.strArea ?? '';
			image = recipe.strMealThumb ?? '';
			instructions = recipe.strInstructions ?? '';

			ingredients = recipe.ingredients?.map((item) => item.name).join(', ') ?? '';

			initialized = true;
		}
	});

	function saveChanges() {
		errors = [];

		if (!name.trim()) {
			errors.push('Recipe name is required.');
		}

		if (!category.trim()) {
			errors.push('Category is required.');
		}

		if (!ingredients.trim()) {
			errors.push('Ingredients are required.');
		}

		if (!instructions.trim()) {
			errors.push('Instructions are required.');
		}

		if (errors.length > 0 || !recipe) {
			return;
		}

		updateCustomRecipe({
			...recipe,
			strMeal: name.trim(),
			strCategory: category.trim(),
			strArea: area.trim() || null,
			strMealThumb: image.trim() || 'https://placehold.co/600x400?text=Recipe',
			strInstructions: instructions.trim(),
			ingredients: ingredients
				.split(',')
				.map((item) => ({
					name: item.trim(),
					measure: ''
				}))
				.filter((item) => item.name)
		});

		showToast(`✏️ Recipe updated!`, 'success');

		goto('/my-recipes');
	}
</script>

<svelte:head>
	<title>Edit Recipe | Recipe Finder</title>
</svelte:head>

<section class="form-page">
	<a href="/my-recipes" class="back-link">← Back to My Recipes</a>

	{#if !recipe}
		<div class="empty-state">
			<div class="empty-icon">❓</div>
			<h1>Recipe not found</h1>
			<p>This recipe doesn't exist or has been deleted.</p>
			<a href="/my-recipes" class="btn-primary">Back to My Recipes</a>
		</div>
	{:else}
		<div class="form-card">
			<h1>Edit Recipe ✏️</h1>
			<p class="subtitle">Update the details of your recipe below.</p>

			{#if errors.length > 0}
				<div class="error-banner">
					<h2>Please fix the following:</h2>
					<ul>
						{#each errors as error (error)}
							<li>{error}</li>
						{/each}
					</ul>
				</div>
			{/if}

			<form
				onsubmit={(event) => {
					event.preventDefault();
					saveChanges();
				}}
			>
				<div class="form-group">
					<label for="edit-name">Recipe name *</label>
					<input id="edit-name" type="text" bind:value={name} />
				</div>

				<div class="form-grid">
					<div class="form-group">
						<label for="edit-category">Category *</label>
						<input id="edit-category" type="text" bind:value={category} />
					</div>

					<div class="form-group">
						<label for="edit-area">Cuisine / Area</label>
						<input id="edit-area" type="text" bind:value={area} />
					</div>
				</div>

				<div class="form-group">
					<label for="edit-image">Image URL</label>
					<input id="edit-image" type="url" bind:value={image} />
				</div>

				<div class="form-group">
					<label for="edit-ingredients">Ingredients *</label>
					<textarea id="edit-ingredients" bind:value={ingredients}></textarea>
					<small class="help-text">Separate ingredients using commas.</small>
				</div>

				<div class="form-group">
					<label for="edit-instructions">Instructions *</label>
					<textarea id="edit-instructions" bind:value={instructions}></textarea>
				</div>

				<button type="submit" class="btn-submit"> Save Changes </button>
			</form>
		</div>
	{/if}
</section>

<style>
	.form-page {
		max-width: 680px;
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

	.form-card {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-lg, 18px);
		padding: 2.5rem;
		box-shadow: var(--shadow-md, 0 4px 12px rgba(0, 0, 0, 0.06));
	}

	h1 {
		font-size: 2rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-text, #1a1a1a);
		margin-bottom: 0.25rem;
	}

	.subtitle {
		color: var(--color-text-muted, #666666);
		font-size: 0.95rem;
		margin-bottom: 2rem;
	}

	.error-banner {
		background-color: #ffebee;
		border: 1px solid #ffcdd2;
		border-radius: var(--radius-sm, 8px);
		padding: 1rem 1.25rem;
		margin-bottom: 1.75rem;
		color: var(--color-danger, #d32f2f);
	}

	.error-banner h2 {
		font-size: 0.95rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.error-banner ul {
		padding-left: 1.25rem;
		font-size: 0.9rem;
	}

	form {
		display: flex;
		flex-direction: column;
		gap: 1.25rem;
	}

	.form-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.25rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 0.4rem;
	}

	label {
		font-size: 0.875rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
	}

	input,
	textarea {
		width: 100%;
		padding: 0.75rem 1rem;
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-sm, 8px);
		font-family: inherit;
		font-size: 0.95rem;
		color: var(--color-text, #1a1a1a);
		background-color: var(--color-surface, #ffffff);
		transition: all 0.2s ease;
	}

	input:focus,
	textarea:focus {
		outline: none;
		border-color: var(--color-primary, #e65100);
		box-shadow: 0 0 0 3px rgba(230, 81, 0, 0.12);
	}

	textarea {
		min-height: 110px;
		resize: vertical;
	}

	.help-text {
		font-size: 0.8rem;
		color: var(--color-text-muted, #666666);
	}

	.btn-submit {
		margin-top: 0.75rem;
		padding: 0.85rem 1.75rem;
		border: none;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary, #e65100);
		color: white;
		font-size: 1rem;
		font-weight: 700;
		cursor: pointer;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(230, 81, 0, 0.25);
	}

	.btn-submit:hover {
		background-color: var(--color-primary-hover, #cc4500);
		transform: translateY(-2px);
		box-shadow: 0 6px 16px rgba(230, 81, 0, 0.35);
	}

	.empty-state {
		text-align: center;
		padding: 4rem 2rem;
		border-radius: var(--radius-lg, 18px);
		background: var(--color-surface, #ffffff);
		border: 1px dashed var(--color-border, #e5e3dd);
		margin: 2rem auto;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.empty-state h1 {
		font-size: 1.5rem;
		margin-bottom: 0.5rem;
	}

	.empty-state p {
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

	@media (max-width: 600px) {
		.form-card {
			padding: 1.5rem;
		}

		.form-grid {
			grid-template-columns: 1fr;
		}
	}
</style>
