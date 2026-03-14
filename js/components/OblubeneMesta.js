import { useGlobalState } from "../composable/GlobalState.js";
import MovieCard from "./MovieCard.js";
const { useRouter, useRoute } = VueRouter;


const OblubeneFilmy = {
    components: { MovieCard },
    template: `
    <div>
        <div class="films-header">
            <h2>Favorite films of user: {{ LoggedUsername }}</h2>
            <button @click="logout">Logout</button>
        </div>
        <p v-if="oblubeneFilmy.length == 0">No favorite films yet.</p>
        <div v-else class="favorites-list">
            <MovieCard
                v-for="film in oblubeneFilmy"
                :key="film.id"
                :movie="film"
                :mode="'favorites'"
                @remove="removeFromFavorites"
            />
        </div>
    </div>
    `,
    setup() {
        const { LoggedUsername, oblubeneFilmy, isLoggedIn, showToast } = useGlobalState();
        const router = useRouter();
        const route = useRoute();

        function logout() {

            LoggedUsername.value = "";
            oblubeneFilmy.length = 0;
            isLoggedIn.value = 0;
            showToast("Successfully logged out.");
            router.push({ path: '/' });
        }

        function removeFromFavorites(film) {
            const index = oblubeneFilmy.indexOf(film);
            if (index > -1) { // od 0
                oblubeneFilmy.splice(index, 1);
                showToast("Film was removed from favorites.");
            }
        }
        return { LoggedUsername, oblubeneFilmy, route, router, logout, removeFromFavorites };
    }
};

export default OblubeneFilmy;