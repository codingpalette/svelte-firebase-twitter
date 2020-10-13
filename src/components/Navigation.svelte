<script>
    import {link} from 'svelte-spa-router';
    import active from 'svelte-spa-router/active';
    import { currentUser } from '../store/user';
</script>


<nav class="nav_box">
    <ul style="display: flex; justify-content: center; margin-top: 50px;">
        <li style={{ marginRight: 10 }}>
            <a href="/" use:link use:active>
                <i class="fab fa-twitter fa-2x" style="color: #04AAFF;"></i>
            </a>
        </li>
        <li>
            <a href="/profile" use:link use:active  style="margin-left: 10px; display: flex; flex-direction: column; align-items: center; font-size: 12px;">
                <i class="fas fa-user fa-2x" style="color: #04AAFF;"></i>
                <span style="margin-top: 10px">
                    {#if $currentUser.displayName}
                        {$currentUser.displayName}의 Profile
                    {:else}
                        Profile
                    {/if}
                </span>
            </a>
        </li>
    </ul>
</nav>

<style>
    .nav_box{
        margin-bottom: 80px;
    }
</style>
