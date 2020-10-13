<script>
	import Router from 'svelte-spa-router';
	import routes from './routes';
	import { init, isLoggedIn } from './store/user';
	import UserObserver  from './components/UserObserver.svelte';
	import Navigation from './components/Navigation.svelte';
	import Footer from './components/Footer.svelte';


</script>

<UserObserver />
{#if $init}
    {#if $isLoggedIn}
        <Navigation />
    {/if}
    <div class="router_box">
        <Router {routes} />
    </div>
{:else}
    <div>loading...</div>
{/if}
<Footer />

<style>
    .router_box{
        max-width: 890px;
        width: 100%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
    }
</style>
