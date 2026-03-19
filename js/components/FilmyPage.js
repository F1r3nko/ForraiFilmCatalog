import FilmyFilter from "./FilmyFilter.js";
import MovieCard from "./MovieCard.js";

const { ref } = Vue;
import { useGlobalState } from "../composable/GlobalState.js";

const FilmyPage = {
    components: { FilmyFilter, MovieCard },
    template: `
    <div>
        <div class="films-header">
            <h1>Films</h1>
            <button @click="showFilters = !showFilters" 
                class="filter-toggle-btn" 
                :class="{ open: showFilters }">
                {{ showFilters ? '✕ Hide' : '⚙ Filters' }}
            </button>
        </div>
        
    <div v-show="showFilters" class="filter-panel">
        <FilmyFilter />
    </div>

    <div v-if="!isLoaded" class="loading-container">
        <div class="spinner"></div>
        <p>Loading films...</p>
    </div>

    <div v-else class="movie-grid">
        <MovieCard 
            v-for="movie in filteredFilms" 
            :key="movie.id"
            :movie="movie"
            :isFavorite="oblubeneFilmy.includes(movie)"
            @toggle-favorite="toggleFavorite" 
        /><!--Potomok -> rodič: Objekt  movie ktorý potomok poslal cez $emit príde sem ako parameter automaticky.-->
        <!--rodič -> Potomok: Objekt  movie ktorý rodič poslal cez props :movie ,:isFavorite .-->
    </div>`,
    setup() {
        const { isLoaded, oblubeneFilmy, filteredFilms, showToast } = useGlobalState();
        const showFilters = ref(false);

        function toggleFavorite(movie) {
            const index = oblubeneFilmy.indexOf(movie);
            index == -1 ? oblubeneFilmy.push(movie) : oblubeneFilmy.splice(index, 1); // ak nenajde vrati -1
            showToast(index == -1 ? "Film was added to favorites." : "Film was removed from favorites."); //naprv zaporne ptoom kladne

        }

        return { isLoaded, filteredFilms, oblubeneFilmy, toggleFavorite, showFilters };
    }
};

export default FilmyPage;