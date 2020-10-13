<script>
    import {authService} from "../fbase";

    let email = '';
    let password = '';
    let newAccount = true;
    let errorMessage = '';

    const toggleAccount = () => {
        newAccount = !newAccount;
    }

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
            // console.log(data)
        } catch (error) {
            console.log(error)
            errorMessage = error.message;
        }
    }
</script>


<form on:submit|preventDefault={onSubmit} class="container">
    <input
        name="email"
        type="text"
        placeholder="Email"
        required
        bind:value={email}
        class="authInput"
    />
    <input
        name="password"
        type="password"
        placeholder="Password"
        required
        bind:value={password}
        class="authInput"
    />
    <input type="submit" value={newAccount ? 'Create Account' : 'Sign In'} class="authInput authSubmit" />
    {#if errorMessage}
        <span class="authError">{errorMessage}</span>
    {/if}
</form>
<span on:click={toggleAccount} class="authSwitch">{newAccount ? 'Sign In' : 'Create Account'}</span>
