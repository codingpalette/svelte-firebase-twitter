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

<div class="authContainer">
    <i class="fab fa-twitter fa-3x" style="color: #04aaff; margin-bottom: 30px"></i>
    <AuthForm />
    <div class="authBtns">
        <button
            on:click={onSocialClick}
            name="google"
            class="authBtn"
        >
            Continue with Google <i class="fab fa-google"></i>
        </button>
    </div>
</div>

