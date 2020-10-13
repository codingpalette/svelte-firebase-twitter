import Auth from './routes/Auth.svelte'
import Home from './routes/Home.svelte'
import Profile from './routes/Profile.svelte'



const routes = {
    '/': Home,
    '/auth': Auth,
    '/profile': Profile,
};

export default routes;
