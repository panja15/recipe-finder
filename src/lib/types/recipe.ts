export interface Ingredient {
    name: string;
    measure: string;
}

export interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string | null;
    strArea: string | null;
    strInstructions: string | null;
    ingredients?: Ingredient[];
    source?: 'api' | 'custom';
}