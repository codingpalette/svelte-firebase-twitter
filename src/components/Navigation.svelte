<script>
    import {link} from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
    import { currentUser } from '../store/user';
</script>


<nav>
    <ul>
        <li>
            <a href="/" use:link use:active>Home</a>
        </li>
        <li>
            <a href="/profile" use:link use:active>{$currentUser.displayName}의 Profile</a>
        </li>
    </ul>
</nav>
