const API_URL = 'https://www.themealdb.com/api/json/v1/1';

import type { Recipe, Ingredient } from '$lib/types/recipe';

function extractIngredients(meal: Record<string, unknown>): Ingredient[] {
	const ingredients: Ingredient[] = [];

	for (let i = 1; i <= 20; i++) {
		const name = meal[`strIngredient${i}`];
		const measure = meal[`strMeasure${i}`];

		if (typeof name === 'string' && name.trim()) {
			ingredients.push({
				name: name.trim(),
				measure: typeof measure === 'string' ? measure.trim() : ''
			});
		}
	}

	return ingredients;
}

function normalizeMeal(meal: Record<string, unknown>): Recipe {
	return {
		idMeal: String(meal.idMeal ?? ''),
		strMeal: String(meal.strMeal ?? ''),
		strMealThumb: String(meal.strMealThumb ?? ''),
		strCategory: typeof meal.strCategory === 'string' ? meal.strCategory : null,
		strArea: typeof meal.strArea === 'string' ? meal.strArea : null,
		strInstructions:
			typeof meal.strInstructions === 'string' ? meal.strInstructions : null,
		ingredients: extractIngredients(meal),
		source: 'api'
	};
}

export async function searchMeals(query: string): Promise<Recipe[]> {
	const response = await fetch(`${API_URL}/search.php?s=${encodeURIComponent(query)}`);

	if (!response.ok) {
		throw new Error('Failed to fetch recipes');
	}

	const data = await response.json();

	const meals = data.meals ?? [];

	return meals.map((meal: Record<string, unknown>) => normalizeMeal(meal));
}

export async function getMeal(id: string): Promise<Recipe | null> {
	const response = await fetch(`${API_URL}/lookup.php?i=${encodeURIComponent(id)}`);

	if (!response.ok) {
		throw new Error('Failed to fetch recipe');
	}

	const data = await response.json();

	const meal = data.meals?.[0];

	if (!meal) {
		return null;
	}

	return normalizeMeal(meal);
}