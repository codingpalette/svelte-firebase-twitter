import { writable } from 'svelte/store';

export const init = writable(false);
export const isLoggedIn = writable(false);
export const currentUser = writable(null)
