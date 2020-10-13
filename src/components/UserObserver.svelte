<script>
    import { onMount } from 'svelte';
    import { isLoggedIn, init, currentUser } from '../store/user';
    import {authService} from '../fbase';

    onMount(() => {
        authService.onAuthStateChanged(user => {
            if(user) {
                $isLoggedIn = true;
                $currentUser = {
                    displayName:user.displayName,
                    uid:user.uid,
                    updateProfile: (args) => user.updateProfile(args)
                }
            } else {
                $isLoggedIn = false;
                $currentUser = false;
            }
            $init = true;
        })

    })
</script>
