<script lang="ts">
	import { getCustomRecipes, deleteCustomRecipe } from '$lib/stores/customRecipes.svelte';
	import { showToast } from '$lib/stores/toast.svelte';

	let recipes = $derived(getCustomRecipes());
	let recipeToDelete = $state<{ id: string; name: string } | null>(null);

	function promptDelete(id: string, name: string) {
		recipeToDelete = { id, name };
	}

	function confirmDelete() {
		if (!recipeToDelete) {
			return;
		}

		deleteCustomRecipe(recipeToDelete.id);
		showToast(`🗑️ Recipe "${recipeToDelete.name}" deleted`, 'danger');
		recipeToDelete = null;
	}
</script>

<svelte:head>
	<title>My Recipes | Recipe Finder</title>
</svelte:head>

<section class="my-recipes-page">
	<div class="header">
		<div>
			<h1>My Recipes 👨‍🍳</h1>
			<p class="subtitle">Manage your custom created recipes.</p>
		</div>

		<a href="/my-recipes/new" class="btn-primary">
			+ Add Recipe
		</a>
	</div>

	{#if recipes.length === 0}
		<div class="empty-state">
			<div class="empty-icon">📖</div>
			<h2>No custom recipes yet</h2>
			<p>You haven't created any custom recipes. Start building your personal cookbook!</p>
			<a href="/my-recipes/new" class="btn-primary"> Create your first recipe </a>
		</div>
	{:else}
		<div class="recipes-grid">
			{#each recipes as recipe (recipe.idMeal)}
				<article class="recipe-card">
					<div class="image-container">
						<img src={recipe.strMealThumb} alt={recipe.strMeal} />
						{#if recipe.strCategory}
							<span class="category-badge">{recipe.strCategory}</span>
						{/if}
					</div>

					<div class="card-body">
						<h2>{recipe.strMeal}</h2>

						<div class="card-actions">
							<a href={`/my-recipes/${recipe.idMeal}/edit`} class="btn-edit">
								✏️ Edit
							</a>

							<button
								class="btn-delete"
								onclick={() => promptDelete(recipe.idMeal, recipe.strMeal)}
							>
								🗑️ Delete
							</button>
						</div>
					</div>
				</article>
			{/each}
		</div>
	{/if}
</section>

{#if recipeToDelete}
	<div class="modal-backdrop">
		<div class="modal">
			<button class="close-btn" onclick={() => (recipeToDelete = null)} aria-label="Close modal">×</button>

			<div class="modal-content">
				<div class="warning-icon">⚠️</div>
				<h2>Delete Recipe?</h2>
				<p>Are you sure you want to delete <strong>"{recipeToDelete.name}"</strong>? This action cannot be undone.</p>

				<div class="modal-actions">
					<button class="btn-cancel" onclick={() => (recipeToDelete = null)}>Cancel</button>
					<button class="btn-confirm-delete" onclick={confirmDelete}>Delete Recipe</button>
				</div>
			</div>
		</div>
	</div>
{/if}

<style>
	.my-recipes-page {
		max-width: 1200px;
		margin: 0 auto;
	}

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 2rem;
		padding-bottom: 1.25rem;
		border-bottom: 2px solid var(--color-border-light, #f0eee8);
	}

	h1 {
		font-size: 2.25rem;
		font-weight: 800;
		letter-spacing: -0.02em;
		color: var(--color-text, #1a1a1a);
	}

	.subtitle {
		color: var(--color-text-muted, #666666);
		font-size: 0.95rem;
		margin-top: 0.25rem;
	}

	.btn-primary {
		display: inline-flex;
		align-items: center;
		padding: 0.75rem 1.5rem;
		border-radius: var(--radius-full, 9999px);
		background-color: var(--color-primary, #e65100);
		color: white;
		font-weight: 700;
		font-size: 0.95rem;
		text-decoration: none;
		transition: all 0.2s ease;
		box-shadow: 0 4px 12px rgba(230, 81, 0, 0.25);
		border: none;
		cursor: pointer;
	}

	.btn-primary:hover {
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
		max-width: 500px;
	}

	.empty-icon {
		font-size: 3rem;
		margin-bottom: 1rem;
	}

	.empty-state h2 {
		font-size: 1.5rem;
		font-weight: 700;
		margin-bottom: 0.5rem;
		color: var(--color-text, #1a1a1a);
	}

	.empty-state p {
		color: var(--color-text-muted, #666666);
		margin-bottom: 1.75rem;
		line-height: 1.6;
	}

	.recipes-grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
		gap: 1.75rem;
	}

	.recipe-card {
		background: var(--color-surface, #ffffff);
		border: 1px solid var(--color-border, #e5e3dd);
		border-radius: var(--radius-md, 12px);
		overflow: hidden;
		box-shadow: var(--shadow-sm, 0 2px 4px rgba(0, 0, 0, 0.03));
		transition: all 0.25s ease;
		display: flex;
		flex-direction: column;
	}

	.recipe-card:hover {
		transform: translateY(-4px);
		box-shadow: var(--shadow-lg, 0 10px 25px rgba(0, 0, 0, 0.08));
	}

	.image-container {
		position: relative;
		overflow: hidden;
		background: var(--color-border-light, #f0eee8);
	}

	.image-container img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		display: block;
	}

	.category-badge {
		position: absolute;
		bottom: 10px;
		left: 10px;
		font-size: 0.75rem;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.05em;
		padding: 0.25rem 0.6rem;
		border-radius: var(--radius-full, 9999px);
		background-color: rgba(255, 255, 255, 0.9);
		backdrop-filter: blur(4px);
		color: var(--color-primary, #e65100);
	}

	.card-body {
		padding: 1.25rem;
		display: flex;
		flex-direction: column;
		flex-grow: 1;
	}

	.card-body h2 {
		font-size: 1.15rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
		margin-bottom: 1.25rem;
		line-height: 1.3;
	}

	.card-actions {
		display: flex;
		gap: 0.75rem;
		margin-top: auto;
	}

	.btn-edit {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius-sm, 8px);
		border: 1px solid var(--color-border, #e5e3dd);
		background: var(--color-surface, #ffffff);
		color: var(--color-text, #1a1a1a);
		font-size: 0.875rem;
		font-weight: 600;
		text-decoration: none;
		transition: all 0.2s ease;
	}

	.btn-edit:hover {
		background: var(--color-surface-hover, #f5f4f0);
		border-color: #ccc;
	}

	.btn-delete {
		flex: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.5rem 0.85rem;
		border-radius: var(--radius-sm, 8px);
		border: 1px solid #ffcdd2;
		background: #fff5f5;
		color: var(--color-danger, #d32f2f);
		font-size: 0.875rem;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease;
	}

	.btn-delete:hover {
		background: #ffebee;
		border-color: var(--color-danger, #d32f2f);
	}

	@media (max-width: 640px) {
		.header {
			flex-direction: column;
			align-items: flex-start;
			gap: 1rem;
		}

		h1 {
			font-size: 1.75rem;
		}
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
		padding: 2rem;
		border-radius: var(--radius-lg, 18px);
		background: var(--color-surface, #ffffff);
		box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
		border: 1px solid var(--color-border-light, #f0eee8);
	}

	.close-btn {
		position: absolute;
		top: 1rem;
		right: 1rem;
		width: 34px;
		height: 34px;
		border: none;
		border-radius: 50%;
		background: var(--color-surface-hover, #f5f4f0);
		font-size: 1.4rem;
		color: var(--color-text-muted, #666666);
		display: flex;
		align-items: center;
		justify-content: center;
		cursor: pointer;
	}

	.warning-icon {
		font-size: 2.5rem;
		margin-bottom: 0.75rem;
	}

	.modal-content h2 {
		font-size: 1.35rem;
		font-weight: 700;
		color: var(--color-text, #1a1a1a);
		margin-bottom: 0.5rem;
	}

	.modal-content p {
		color: var(--color-text-muted, #666666);
		font-size: 0.95rem;
		margin-bottom: 1.5rem;
		line-height: 1.5;
	}

	.modal-actions {
		display: flex;
		gap: 0.75rem;
	}

	.btn-cancel {
		flex: 1;
		padding: 0.75rem;
		border-radius: var(--radius-full, 9999px);
		border: 1px solid var(--color-border, #e5e3dd);
		background: var(--color-surface, #ffffff);
		color: var(--color-text, #1a1a1a);
		font-size: 0.9rem;
		font-weight: 600;
		cursor: pointer;
	}

	.btn-confirm-delete {
		flex: 1;
		padding: 0.75rem;
		border-radius: var(--radius-full, 9999px);
		border: none;
		background: var(--color-danger, #d32f2f);
		color: white;
		font-size: 0.9rem;
		font-weight: 700;
		cursor: pointer;
		transition: background 0.2s ease;
	}

	.btn-confirm-delete:hover {
		background: var(--color-danger-hover, #b71c1c);
	}
</style>
