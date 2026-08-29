<script lang="ts">
    import { getFavorites } from '$lib/stores/favorites.svelte';
    import RecipeGrid from '$lib/components/RecipeGrid.svelte';

    let favorites = $derived(getFavorites());
</script>

<svelte:head>
    <title>Favorites | Recipe Finder</title>
</svelte:head>

<section class="favorites-page">
    <div class="header">
        <h1>My Favorites ❤️</h1>
        {#if favorites.length > 0}
            <span class="count-badge">
                {favorites.length} {favorites.length === 1 ? 'recipe' : 'recipes'}
            </span>
        {/if}
    </div>

    {#if favorites.length === 0}
        <div class="empty-state">
            <div class="empty-icon">💖</div>
            <h2>No favorites saved yet</h2>
            <p>
                You haven't added any favorite recipes yet. Click the heart icon on any recipe to save it here!
            </p>

            <a href="/" class="btn-primary">
                Discover recipes
            </a>
        </div>
    {:else}
        <RecipeGrid recipes={favorites} />
    {/if}
</section>

<style>
    .favorites-page {
        max-width: 1200px;
        margin: 0 auto;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
        padding-bottom: 1rem;
        border-bottom: 2px solid var(--color-border-light, #f0eee8);
    }

    h1 {
        font-size: 2.25rem;
        font-weight: 800;
        letter-spacing: -0.02em;
        color: var(--color-text, #1a1a1a);
    }

    .count-badge {
        font-size: 0.875rem;
        font-weight: 700;
        padding: 0.35rem 0.85rem;
        border-radius: var(--radius-full, 9999px);
        background-color: var(--color-primary-light, #fff3e0);
        color: var(--color-primary, #e65100);
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

    .btn-primary {
        display: inline-block;
        padding: 0.75rem 1.75rem;
        border-radius: var(--radius-full, 9999px);
        background-color: var(--color-primary, #e65100);
        color: white;
        font-weight: 700;
        text-decoration: none;
        transition: all 0.2s ease;
        box-shadow: 0 4px 12px rgba(230, 81, 0, 0.25);
    }

    .btn-primary:hover {
        background-color: var(--color-primary-hover, #cc4500);
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(230, 81, 0, 0.35);
    }

    @media (max-width: 640px) {
        .header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
        }

        h1 {
            font-size: 1.75rem;
        }
    }
</style>