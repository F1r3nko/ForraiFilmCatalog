const { ref, } = Vue;
import { useGlobalState } from "../composable/GlobalState.js";

const FilmyFilter = {
    template: `
        <div>
            <div class="movie-filter">
    <label>Search:</label>
    <input type="text" v-model="query" @input="updateFilms">

    <label>Minimum Rating:</label>
    <input type="number" v-model="rating" @input="updateFilms" min="0" max="10" step="0.1">

    <label>Minimum Year:</label>
    <input type="number" v-model="minYear" @input="updateFilms" min="1900" max="2100" step="1">

    <label>Maximum Year:</label>
    <input type="number" v-model="maxYear" @input="updateFilms" min="1900" max="2100" step="1">

    <label>Minimum time(min):</label>
    <input type="number" v-model="minTime" @input="updateFilms" min="0" max="500" step="1">

    <label>Maximum time(min):</label>
    <input type="number" v-model="maxTime" @input="updateFilms" min="0" max="500" step="1">
</div>

            <div class="movie-filter">
                <div>Genres:</div>
                <label v-for="genre in allGenres" :key="genre" style="margin-right: 12px;">
                    <input type="checkbox" :value="genre" v-model="selectedGenres" @change="updateFilms">
                    {{ genre }}
                </label>
            </div>
            <div class="movie-sort">
                <label>Directors:</label>
                <select v-model="selectedDirectors" size="2" @change="updateFilms"> 
                    <option value="" selected >All</option>
                    <option v-for="director in allDirectors" :key="director" :value="director">
                        {{ director }}
                    </option>
                </select>
            </div>


            <div class="movie-sort">
                <label>Sort by:</label>
                <select v-model="sort" @change="updateFilms">
                    <option value="sortAZ">Title (A-Z)</option>
                    <option value="sortZA">Title (Z-A)</option>
                    <option value="sortRatingAsc">Rating (Low to High)</option>
                    <option value="sortRatingDesc">Rating (High to Low)</option>
                </select>
                <button @click="resetFilters">Reset Filters</button>

            </div>

        </div>
    `,

    setup() {
        const { allGenres, allDirectors, allFilms, filteredFilms } = useGlobalState();

        const sort = ref("sortRatingDesc");
        const rating = ref(null);
        const minYear = ref(null);
        const maxYear = ref(null);
        const query = ref("");
        const selectedGenres = ref([]);
        const selectedDirectors = ref("");
        const minTime = ref(null);
        const maxTime = ref(null);

        function updateFilms() {
            let films = [...allFilms];

            if (rating.value) films = films.filter(m => m.rating >= rating.value);
            if (minYear.value) films = films.filter(m => m.year >= minYear.value);
            if (maxYear.value) films = films.filter(m => m.year <= maxYear.value);
            if (query.value) films = films.filter(m => m.title.toLowerCase().includes(query.value.toLowerCase()));
            if (selectedGenres.value.length) films = films.filter(m => selectedGenres.value.every(g => m.genre.includes(g)));
            if (selectedDirectors.value) films = films.filter(m => m.director === selectedDirectors.value);
            if (minTime.value) films = films.filter(m => m.duration >= minTime.value);
            if (maxTime.value) films = films.filter(m => m.duration <= maxTime.value);

            switch (sort.value) {
                case "sortAZ":
                    films.sort((a, b) => a.title.localeCompare(b.title));
                    break;
                case "sortZA":
                    films.sort((a, b) => b.title.localeCompare(a.title));
                    break;
                case "sortRatingAsc":
                    films.sort((a, b) => a.rating - b.rating);
                    break;
                case "sortRatingDesc":
                    films.sort((a, b) => b.rating - a.rating);
                    break;
            }

            filteredFilms.splice(0, filteredFilms.length, ...films);
        }

        function resetFilters() {
            sort.value = "sortRatingDesc";
            rating.value = null;
            query.value = "";
            selectedGenres.value = [];
            selectedDirectors.value = "";
            minYear.value = null;
            maxYear.value = null;
            minTime.value = null;
            maxTime.value = null;
            updateFilms();
        }


        updateFilms();
        return { allGenres, allDirectors, sort, rating, query, selectedGenres, selectedDirectors, resetFilters, minYear, maxYear, minTime, maxTime, updateFilms };
    }
};

export default FilmyFilter;