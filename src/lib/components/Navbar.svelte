<nav>
	<a href="/" class="brand">🍳 Recipe Finder</a>

	<div class="nav-links">
		<a href="/" class="nav-link">Home</a>
		<a href="/favorites" class="nav-link">Favorites</a>
		<a href="/my-recipes" class="nav-link">My Recipes</a>
		<a href="/planner" class="nav-link">Meal Planner</a>
	</div>
</nav>

<style>
	nav {
		position: sticky;
		top: 0;
		z-index: 100;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 2rem;
		background: rgba(255, 255, 255, 0.85);
		backdrop-filter: blur(12px);
		-webkit-backdrop-filter: blur(12px);
		border-bottom: 1px solid var(--color-border-light, #f0eee8);
		box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
		margin-bottom: 2rem;
		transition: border-color 0.2s ease;
	}

	.brand {
		font-size: 1.25rem;
		font-weight: 800;
		color: var(--color-text, #1a1a1a);
		display: flex;
		align-items: center;
		gap: 0.5rem;
		letter-spacing: -0.02em;
	}

	.brand:hover {
		color: var(--color-primary, #e65100);
	}

	.nav-links {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.nav-link {
		padding: 0.5rem 1rem;
		border-radius: var(--radius-full, 9999px);
		font-size: 0.925rem;
		font-weight: 600;
		color: var(--color-text-muted, #666666);
		transition: all 0.2s ease;
	}

	.nav-link:hover {
		color: var(--color-primary, #e65100);
		background-color: var(--color-primary-light, #fff3e0);
	}

	a {
		text-decoration: none;
	}

	@media (max-width: 640px) {
		nav {
			flex-direction: column;
			gap: 0.75rem;
			padding: 0.85rem 1rem;
		}

		.nav-links {
			width: 100%;
			justify-content: center;
			gap: 0.25rem;
		}

		.nav-link {
			padding: 0.4rem 0.75rem;
			font-size: 0.85rem;
		}
	}
</style>
