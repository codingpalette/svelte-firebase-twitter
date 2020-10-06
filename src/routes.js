import Auth from './routes/Auth.svelte'
import Home from './routes/Home.svelte'
import Profile from './routes/Profile.svelte'
import EditProfile from './routes/EditProfile.svelte'



const routes = {
    '/': Home,
    '/auth': Auth,
    '/profile': Profile,
    '/edit_profile': EditProfile
};

export default routes;