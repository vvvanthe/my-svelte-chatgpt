import { writable } from 'svelte/store';

function createLocation() {
	const { subscribe, set, update } = writable('');

	return {
		subscribe,
		update: (x:string) => update((n) => x),
		reset: () => set('')
	};
}

export const location = createLocation();