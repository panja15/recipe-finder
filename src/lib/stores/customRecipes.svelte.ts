import type { Recipe } from '$lib/types/recipe';

let customRecipes = $state<Recipe[]>([]);

export function getCustomRecipes() {
	return customRecipes;
}

export function addCustomRecipe(recipe: Recipe) {
	customRecipes.push(recipe);
	saveRecipes();
}

export function updateCustomRecipe(recipe: Recipe) {
	const index = customRecipes.findIndex((item) => item.idMeal === recipe.idMeal);

	if (index !== -1) {
		customRecipes[index] = recipe;
		saveRecipes();
	}
}

export function deleteCustomRecipe(id: string) {
	customRecipes = customRecipes.filter((recipe) => recipe.idMeal !== id);

	saveRecipes();
}

function saveRecipes() {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('custom-recipes', JSON.stringify(customRecipes));
	}
}

export function loadCustomRecipes() {
	if (typeof localStorage === 'undefined') {
		return;
	}

	const saved = localStorage.getItem('custom-recipes');

	if (saved) {
		customRecipes = JSON.parse(saved);
	}
}
