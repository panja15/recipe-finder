export interface Toast {
	id: string;
	message: string;
	type: 'success' | 'info' | 'warning' | 'danger';
}

let toasts = $state<Toast[]>([]);

export function getToasts() {
	return toasts;
}

export function showToast(
	message: string,
	type: 'success' | 'info' | 'warning' | 'danger' = 'success',
	duration = 3500
) {
	const id = crypto.randomUUID();
	toasts.push({ id, message, type });

	setTimeout(() => {
		removeToast(id);
	}, duration);
}

export function removeToast(id: string) {
	const index = toasts.findIndex((t) => t.id === id);
	if (index !== -1) {
		toasts.splice(index, 1);
	}
}
