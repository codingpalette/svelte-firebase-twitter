import App from './App.svelte';
import firebase from "./firebase";
console.log(firebase)

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;