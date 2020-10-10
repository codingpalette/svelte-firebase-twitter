<script>
    import {link} from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
</script>


<nav>
    <ul>
        <li>
            <a href="/" use:link use:active>Home</a>
        </li>
        <li>
            <a href="/profile" use:link use:active>My Profile</a>
        </li>
    </ul>
</nav>
