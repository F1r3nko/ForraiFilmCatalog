import { useGlobalState } from "../composable/GlobalState.js";


const navbar = {
    template: `
    <nav>
        <router-link to="/" class="nav-link">Home</router-link>
        <router-link to="/filmy" class="nav-link">Filmy</router-link>
        <router-link to="/add" class="nav-link">Add Film</router-link>
        
        <router-link v-if= "isLoggedIn == 1" :to="'/login?logged=1'" class="nav-link">Profile</router-link>

        <router-link v-else to="/login" class="nav-link">Login</router-link>
    </nav>
    `,
    setup() {
        const { isLoggedIn } = useGlobalState();

        return { isLoggedIn }

    }
};

export default navbar;