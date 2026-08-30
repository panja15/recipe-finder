import { browser } from '$app/environment';

if (browser) {
	import('@panja.tushar15/recipe-components/loader').then((pkg) => {
		const defineCustomElements =
			pkg.defineCustomElements || (pkg.default && pkg.default.defineCustomElements);
		if (typeof defineCustomElements === 'function') {
			defineCustomElements();
		}
	});
}