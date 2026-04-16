const { ref } = Vue;
import { useGlobalState } from "../composable/GlobalState.js";
const MovieCard = {
    props: ['movie', 'isFavorite', 'mode'],
    emits: ['toggle-favorite', 'remove'],
    template: `
        <div class="movie-card">
            <button v-if="isLoggedIn == 1 && mode != 'favorites'" @click="deleteFilm(movie.id)" class="delete-btn">X</button>
            <img :src="movie.image" :alt="movie.title" class="movie-image">
            <h2>{{ movie.title }}</h2>
            <div class="movie-rating">Rating: {{ movie.rating }}</div>
            <router-link :to="'/filmy/' + movie.id">Detail</router-link>
            <button @click="(event)=>{event.stopPropagation();showDesc = !showDesc}" class="fav-btn">
                {{ showDesc ? '▲ Hide description' : '▼ Show description' }}
            </button>

            <div class="descri" v-show="showDesc" >
                {{ movie.description }}
            </div>

            <button v-if="mode == 'favorites'" 
                @click="(event)=>{event.stopPropagation();$emit('remove', movie)}" 
                class="fav-btn" >
                🗑 Remove
            </button>

            <button v-else 
                @click="(event)=>{event.stopPropagation();$emit('toggle-favorite', movie)}" 
                class="fav-btn" :class="{ active: isFavorite }" >
                {{ isFavorite ? '★ Favorite' : '☆ Add to Favorites' }}
            </button>
        </div>
    `,
    setup() {
        const { isLoggedIn, allFilms, filteredFilms, oblubeneFilmy, showToast } = useGlobalState();
        const showDesc = ref(false);

        function deleteFilm(id) {
            const i = allFilms.findIndex(film => film.id === id);
            if (i !== -1) allFilms.splice(i, 1);

            const j = filteredFilms.findIndex(film => film.id === id);
            if (j !== -1) filteredFilms.splice(j, 1);

            const k = oblubeneFilmy.findIndex(film => film.id === id);
            if (k !== -1) oblubeneFilmy.splice(k, 1);
            showToast("Film was deleted.");
        }
        return { showDesc, isLoggedIn, allFilms, filteredFilms, oblubeneFilmy, deleteFilm };
    }
};

export default MovieCard;