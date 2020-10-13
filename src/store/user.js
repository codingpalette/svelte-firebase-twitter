import { writable, derived  } from 'svelte/store';
import { authService } from '../fbase.js';


export const init = writable(false);
export const isLoggedIn = writable(false);
export const currentUser = writable(null);
