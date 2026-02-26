const { reactive, ref } = Vue; // watch už netreba

const FilmyPage = {
    template: `
    <div>
        <h1>Films</h1>
        <div class="movie-filter">
            <label for="genre">Filter by Genre:</label>
            <select id="genre" name="genre" v-model="selectedGenre" @change="applyFilter">
                <option value="all">All</option>
                <option v-for="genre in allGenres" :key="genre" :value="genre">
                    {{ genre }}
                </option>
            </select>

            <label for="rating">Minimal Rating:</label>
            <input type="number" id="rating" name="rating" v-model="selectedRating" min="0" max="10" @input="applyFilter">
        </div>

        <div class="movie-sort">
            <label for="sort">Sort by:</label>
            <select id="sort" name="sort" v-model="selectedSort" @change="applySort">
                <option value="default">Default</option>
                <option value="title-asc">Title (A-Z)</option>
                <option value="title-desc">Title (Z-A)</option>
                <option value="rating-asc">Rating (Low to High)</option>
                <option value="rating-desc">Rating (High to Low)</option>
            </select>
        </div>

        <div class="movie-grid">
            <div v-for="movie in filteredFilms" :key="movie.id" class="movie-card">
                <img :src="movie.image" :alt="movie.title" class="movie-image">
                <h2>{{ movie.title }}</h2>
                <div class="movie-rating">Rating: {{ movie.rating }}</div>
                <router-link :to="'/filmy/' + movie.id">Detail</router-link>
            </div>
        </div>
    </div>
    `,
    setup() {
        const allFilms = reactive([]);
        const filteredFilms = reactive([]);
        const allGenres = reactive([]);
        const selectedGenre = ref("all");
        const selectedRating = ref(0);
        const selectedSort = ref("default");

        // Pomocná funkcia na zoradenie poľa filmov podľa selectedSort
        function sortFilms(filmsArray) {
            const sortValue = selectedSort.value;
            if (sortValue === "default") {
                return filmsArray; // ponechá pôvodné poradie
            }

            const sorted = [...filmsArray];
            sorted.sort((a, b) => {
                if (sortValue === "title-asc") {
                    return a.title.localeCompare(b.title, 'sk');
                } else if (sortValue === "title-desc") {
                    return b.title.localeCompare(a.title, 'sk');
                } else if (sortValue === "rating-asc") {
                    return a.rating - b.rating;
                } else if (sortValue === "rating-desc") {
                    return b.rating - a.rating;
                }
                return 0;
            });
            return sorted;

        }

        // Aplikuje filter a následne zoradí
        function applyFilter() {
            const result = allFilms.filter(movie => {
                const ratingPass = movie.rating >= selectedRating.value;
                const genrePass = selectedGenre.value === "all" ||
                    movie.genre.includes(selectedGenre.value);
                return ratingPass && genrePass;
            });

            const sortedResult = sortFilms(result);
            filteredFilms.splice(0, filteredFilms.length, ...sortedResult);
        }

        function applySort() {
            const sortedCurrent = sortFilms([...filteredFilms]); // kópia pre istotu
            filteredFilms.splice(0, filteredFilms.length, ...sortedCurrent);
        }

        // Načítanie dát
        fetch("./data/movies.json")
            .then(response => response.json())
            .then(data => {
                allFilms.push(...data);
                data.forEach(item => {
                    item.genre.forEach(genre => {
                        if (!allGenres.includes(genre)) {
                            allGenres.push(genre);
                        }
                    });
                });
                applyFilter(); // inicializácia
            });

        return {
            filteredFilms,
            allGenres,
            selectedGenre,
            selectedRating,
            selectedSort,
            applyFilter,
            applySort // <-- sprístupnené pre šablónu
        };
    }
};

export default FilmyPage;