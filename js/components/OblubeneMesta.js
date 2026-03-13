import { useGlobalState } from "../composable/GlobalState.js";
const { useRouter, useRoute } = VueRouter;


const OblubeneFilmy = {
    template: `
    <div>
        <h2>Favorite films of user: {{ LoggedUsername }}</h2>
        <button @click="logout">Logout</button>
        <p v-if="oblubeneFilmy.length == 0">No favorite films yet.</p>
        <div v-else class="favorites-list">
            <div class="favorite-item" v-for="film in oblubeneFilmy" :key="film.id">
                <img :src="film.image" :alt="film.title" class="favorite-image">
                <h2>{{ film.title }}</h2>
                <router-link :to="'/filmy/' + film.id">detail</router-link>
                <button @click="removeFromFavorites(film)">Remove</button>
            </div>
        </div>
        `,
    setup() {
        const { LoggedUsername, oblubeneFilmy, isLoggedIn } = useGlobalState();
        const router = useRouter();
        const route = useRoute();

        function logout() {

            LoggedUsername.value = "";
            oblubeneFilmy.length = 0;
            isLoggedIn.value = 0;
            router.push({ path: '/' });
        }

        function removeFromFavorites(film) {
            const index = oblubeneFilmy.indexOf(film);
            if (index > -1) { // od 0
                oblubeneFilmy.splice(index, 1);
            }
        }
        return { LoggedUsername, oblubeneFilmy, route, router, logout, removeFromFavorites };
    }
};

export default OblubeneFilmy;