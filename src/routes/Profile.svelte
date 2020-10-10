<script>
    import { authService } from '../fbase';
    import {push} from 'svelte-spa-router';

    const onLogOutClick = () => {
        authService.signOut();
        push('/home')
    }
</script>

<button type="button" on:click={onLogOutClick}>
    Log Out
</button>