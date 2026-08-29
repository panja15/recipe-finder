import type { Recipe } from '$lib/types/recipe';
import { showToast } from '$lib/stores/toast.svelte';

let favorites = $state<Recipe[]>([]);

export function getFavorites() {
	return favorites;
}

export function isFavorite(id: string) {
	const test = favorites.some((recipe) => recipe.idMeal === id)
	console.log(test , "TESTING")
	return test
}

export function toggleFavorite(recipe: Recipe) {
	const index = favorites.findIndex((item) => item.idMeal === recipe.idMeal);

	if (index === -1) {
		favorites.push(recipe);
		showToast(`❤️ Added "${recipe.strMeal}" to favorites!`, 'success');
	} else {
		favorites.splice(index, 1);
		showToast(`🤍 Removed "${recipe.strMeal}" from favorites`, 'info');
	}
	saveFavorite();
}

function saveFavorite() {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('recipe-favorites', JSON.stringify(favorites));
	}
}

export function loadFavorites() {
	if (typeof localStorage === 'undefined') {
		return;
	}

	const saved = localStorage.getItem('recipe-favorites');

	if (saved) {
		favorites = JSON.parse(saved);
	}
}
