import type { Recipe } from '$lib/types/recipe';

export type Day =
	'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';

export const days: Day[] = [
	'Monday',
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday'
];

type WeeklyPlan = Record<Day, Recipe | null>;

const emptyPlan: WeeklyPlan = {
	Monday: null,
	Tuesday: null,
	Wednesday: null,
	Thursday: null,
	Friday: null,
	Saturday: null,
	Sunday: null
};

let mealPlan = $state<WeeklyPlan>({ ...emptyPlan });

export function getMealPlan() {
	return mealPlan;
}

export function assignMeal(day: Day, recipe: Recipe) {
	mealPlan[day] = recipe;
	saveMealPlan();
}

export function removeMeal(day: Day) {
	mealPlan[day] = null;
	saveMealPlan();
}

function saveMealPlan() {
	if (typeof localStorage !== 'undefined') {
		localStorage.setItem('weekly-meal-plan', JSON.stringify(mealPlan));
	}
}

export function loadMealPlan() {
	if (typeof localStorage === 'undefined') {
		return;
	}

	const saved = localStorage.getItem('weekly-meal-plan');

	if (saved) {
		mealPlan = JSON.parse(saved);
	}
}
