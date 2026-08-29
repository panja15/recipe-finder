<script lang="ts">
	import { getToasts, removeToast } from '$lib/stores/toast.svelte';

	let toasts = $derived(getToasts());
</script>

<div class="toast-container" aria-live="polite">
	{#each toasts as toast (toast.id)}
		<div class="toast toast-{toast.type}">
			<span class="message">{toast.message}</span>
			<button class="close-btn" onclick={() => removeToast(toast.id)} aria-label="Dismiss notification">
				×
			</button>
		</div>
	{/each}
</div>

<style>
	.toast-container {
		position: fixed;
		bottom: 1.75rem;
		right: 1.75rem;
		z-index: 9999;
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		max-width: 400px;
		width: calc(100vw - 2.5rem);
		pointer-events: none;
	}

	.toast {
		pointer-events: auto;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.9rem 1.25rem;
		border-radius: var(--radius-md, 12px);
		font-weight: 600;
		font-size: 0.925rem;
		box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
		line-height: 1.4;
	}

	.toast-success {
		background: rgba(30, 30, 30, 0.92);
		color: #ffffff;
		border-left: 4px solid var(--color-primary, #e65100);
	}

	.toast-info {
		background: rgba(30, 30, 30, 0.92);
		color: #ffffff;
		border-left: 4px solid #0288d1;
	}

	.toast-warning {
		background: rgba(30, 30, 30, 0.92);
		color: #ffffff;
		border-left: 4px solid #f57c00;
	}

	.toast-danger {
		background: rgba(30, 30, 30, 0.92);
		color: #ffffff;
		border-left: 4px solid var(--color-danger, #d32f2f);
	}

	.message {
		flex-grow: 1;
	}

	.close-btn {
		background: none;
		border: none;
		color: currentColor;
		font-size: 1.35rem;
		cursor: pointer;
		opacity: 0.7;
		line-height: 1;
		padding: 0 0.25rem;
		transition: opacity 0.2s ease;
	}

	.close-btn:hover {
		opacity: 1;
	}

	@keyframes slideUp {
		from {
			opacity: 0;
			transform: translateY(1.25rem) scale(0.95);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@media (max-width: 600px) {
		.toast-container {
			bottom: 1rem;
			right: 1.25rem;
			left: 1.25rem;
			width: auto;
		}
	}
</style>
