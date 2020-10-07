<script>
    import { onMount } from 'svelte';
    import { push } from 'svelte-spa-router';
    import {authService} from '../fbase';
    import * as firebase from "firebase/app";


    onMount(() => {
        authService.onAuthStateChanged(user => {
            if(user) {
                push('/')
            }
        })
    })

    let email = '';
    let password = '';
    let newAccount = true;
    let errorMessage = '';

    const onSubmit = async () => {
        try{
            let data
            if (newAccount) {
                // 새로운 계정 생성
                data = await authService.createUserWithEmailAndPassword(
                    email, password
                )
            } else {
                // 로그인
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch (error) {
            console.log(error)
            errorMessage = error.message;
        }
    }

    const toggleAccount = () => {
        newAccount = !newAccount;
    }

    const onSocialClick = async (event) => {
        console.log(event.target.name)
        const {target:{name}} = event;
        let provider;
        if (name === 'google') {
            provider = new firebase.auth.GoogleAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log(data)
    }
</script>

<div>
    <form on:submit|preventDefault={onSubmit}>
        <input
            name="email"
            type="text"
            placeholder="Email"
            required
            bind:value={email}
        />
        <input
            name="password"
            type="password"
            placeholder="Password"
            required
            bind:value={password}
        />
        <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} />
        {errorMessage}
    </form>
    <span on:click={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>

    <div>
        <button on:click={onSocialClick} name="google">Continue with Google</button>
    </div>
</div>

