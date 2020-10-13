<script>
    import {onMount} from 'svelte';
    import {push} from 'svelte-spa-router';
    import {authService} from '../fbase';
    import * as firebase from "firebase/app";
    import AuthForm from "../components/AuthForm.svelte";


    onMount(() => {
        authService.onAuthStateChanged(user => {
            if (user) {
                push('/')
            }
        })
    })


    const onSocialClick = async (event) => {
        // console.log(event.target.name)
        const {target: {name}} = event;
        let provider;
        if (name === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        // console.log(data)
    }
</script>

<div>
    <AuthForm />
    <div>
        <button on:click={onSocialClick} name="google">Continue with Google</button>
    </div>
</div>

