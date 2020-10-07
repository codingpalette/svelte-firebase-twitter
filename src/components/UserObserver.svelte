<script>
    import { onMount } from 'svelte';
    import { isLoggedIn, init } from '../store/user';
    import {authService} from '../fbase';

    onMount(() => {
        authService.onAuthStateChanged(user => {
            if(user) {
                $isLoggedIn = true;
            } else {
                $isLoggedIn = false;
            }
            $init = true;
        })

    })
</script>
