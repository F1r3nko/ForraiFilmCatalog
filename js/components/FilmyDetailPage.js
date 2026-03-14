const { ref } = Vue;
const { useRoute, useRouter } = VueRouter;
import { useGlobalState } from "../composable/GlobalState.js";

const FilmyDetailPage = {
    template: `
    <div class="movie-detail-page" v-if="film">
        <div class="movie-detail-card">


            <div class="movie-content">
                <div class="movie-poster">
                    <img v-if="film.image" :src="film.image" :alt="film.title">
                </div>

                <div class="movie-info">
                    <a href="#" @click.prevent="$router.back()" class="back-link">← Späť</a>

                    <h1>{{ film.title }}</h1>

                    <div class="rating-box">
                        <span class="star">★</span>
                        <span class="rating-value">{{ film.rating }} / 10</span>
                    </div>

                    <div class="meta-info">
                        <div class="meta-item">📅 {{ film.year }}</div>
                        <div class="meta-item" v-if="film.duration">⏱️ {{ film.duration }} min</div>
                    </div>

                    <div class="genre-list">
                        <span v-for="genre in film.genre" :key="genre" class="genre-item">{{ genre }}</span>
                    </div>

                    <div class="director-block">
                        <div class="director-icon">🎬</div>
                        <div>
                            <div class="director-label">Réžia</div>
                            <div class="director-name">{{ film.director }}</div>
                        </div>
                    </div>

                    <div class="description-section">
                        <h3>O filme</h3>
                        <p>{{ film.description }}</p>
                    </div>

                    <button @click="toggleFavorite" class="fav-btn" :class="{ active: isFavorite }">
                        {{ isFavorite ? '★ V obľúbených' : '☆ Pridať do obľúbených' }}
                    </button>
                </div>
            </div>

        </div>
    </div>

    <div v-else class="loading-container">
        <div class="spinner"></div>
        <p>Načítavam film...</p>
    </div>
    `,

    setup() {
        const { allFilms, oblubeneFilmy, showToast } = useGlobalState();
        const route = useRoute();
        const router = useRouter();

        const film = ref(allFilms.find(f => f.id == route.params.id));
        if (!film.value) router.push('/filmy');

        const isFavorite = ref(oblubeneFilmy.includes(film.value));

        function toggleFavorite() {
            const index = oblubeneFilmy.indexOf(film.value);
            if (index === -1) {
                oblubeneFilmy.push(film.value);
                isFavorite.value = true;
            } else {
                oblubeneFilmy.splice(index, 1);
                isFavorite.value = false;
            }
            showToast(index === -1 ? "Film was added to favorites." : "Film was removed from favorites.");
        }

        return { film, isFavorite, toggleFavorite };
    }
};

export default FilmyDetailPage;