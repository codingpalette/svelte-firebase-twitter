<script>
    import { onMount } from 'svelte';
    import { isLoggedIn } from '../store/user';
    import { push } from 'svelte-spa-router';

    onMount(() => {
        if(!$isLoggedIn) {
            push('/auth')
        }
    })
</script>


<div>Home</div>
