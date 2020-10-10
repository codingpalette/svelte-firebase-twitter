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
    <Router {routes} />
{:else}
    <div>loading...</div>
{/if}
<Footer />

<style>

</style>
