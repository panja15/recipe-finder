import { error } from '@sveltejs/kit';

import { getMeal } from '$lib/api/meals';

export async function load({ params }) {
	const recipe = await getMeal(params.id);

	if (!recipe) {
		error(404, 'Recipe not found!');
	}

	return { recipe };
}
