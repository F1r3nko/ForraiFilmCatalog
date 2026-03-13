import FilmyFilter from "./FilmyFilter.js";
const { ref } = Vue;
import { useGlobalState } from "../composable/GlobalState.js";

const FilmyPage = {
    components: { FilmyFilter },
    template: `
    <div>
        <div class="films-header"><h1>Films</h1>
        <button @click="showFilters = !showFilters" 
            class="filter-toggle-btn" 
            :class="{ open: showFilters }">
            {{ showFilters ? '✕ Skryť' : '⚙ Filtre' }}
        </button>
    </div>
        
        <div v-show="showFilters" class="filter-panel">
            <FilmyFilter />
        </div>

        <div v-if="!isLoaded" class="loading-container">
            <div class="spinner"></div>
            <p>Načítavam filmy...</p>
        </div>

        <div v-else class="movie-grid">
            <div v-for="movie in filteredFilms" :key="movie.id" class="movie-card">
                <img :src="movie.image" :alt="movie.title" class="movie-image">
                <h2>{{ movie.title }}</h2>
                <div class="movie-rating">Rating: {{ movie.rating }}</div>
                <router-link :to="'/filmy/' + movie.id">Detail</router-link>
                <button @click="toggleFavorite(movie)" class="fav-btn" :class="{ active: oblubeneFilmy.includes(movie) }" style="width: 90%">
                    {{ oblubeneFilmy.includes(movie) ? '★ Obľúbené' : '☆ Pridať' }}
                </button>
            </div>
        </div>
    </div>
    `,
    setup() {
        const { isLoaded, oblubeneFilmy, filteredFilms } = useGlobalState();
        const showFilters = ref(false);

        function toggleFavorite(movie) {
            const index = oblubeneFilmy.indexOf(movie);
            index === -1 ? oblubeneFilmy.push(movie) : oblubeneFilmy.splice(index, 1);
        }

        return { isLoaded, filteredFilms, oblubeneFilmy, toggleFavorite, showFilters };
    }
};

export default FilmyPage;