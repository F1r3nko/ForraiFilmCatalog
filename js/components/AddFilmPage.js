const { reactive } = Vue;
const { useRouter } = VueRouter;

import { useGlobalState } from "../composable/GlobalState.js";

const AddFilmPage = {
    template: `
        <h1>Add Film</h1>

        <div class="add-film-container">
        <form @submit.prevent="addFilm">

            <label>Title:</label>
            <input type="text" v-model="newFilm.title" required>

            <label>Year:</label>
            <input type="number" v-model="newFilm.year" required>

            <label>Director:</label>
            <input type="text" v-model="newFilm.director" required>

            <label>Genre:</label>
            <select multiple size="10" v-model="newFilm.genre" required>
                <option value="Action">Action</option>
                <option value="Adventure">Adventure</option>
                <option value="Animation">Animation</option>
                <option value="Biography">Biography</option>
                <option value="Comedy">Comedy</option>
                <option value="Crime">Crime</option>
                <option value="Documentary">Documentary</option>
                <option value="Drama">Drama</option>
                <option value="Family">Family</option>
                <option value="Fantasy">Fantasy</option>
                <option value="History">History</option>
                <option value="Horror">Horror</option>
                <option value="Music">Music</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Sport">Sport</option>
                <option value="Thriller">Thriller</option>
                <option value="War">War</option>
                <option value="Western">Western</option>
            </select>

            <label>Rating:</label>
            <input type="number" step="0.1" v-model="newFilm.rating" min="0" max="10" required>

            <label>Duration - min.:</label>
            <input type="number" v-model="newFilm.duration" min="0" max="500" required>

            <label>Description:</label>
            <input type="text" v-model="newFilm.description" required>

            <label>Image:</label>
            <input type="url" v-model="newFilm.image" required>

            <label>Price:</label>
            <input type="number" step="0.01" v-model="newFilm.price" required>

            <button type="submit">Add film</button>

        </form>
        </div>

    `,

    setup() {

        const { allFilms, showToast } = useGlobalState();
        const router = useRouter();

        const newFilm = reactive({
            title: "",
            year: "",
            director: "",
            genre: [],
            rating: "",
            duration: "",
            description: "",
            image: "",
            price: ""
        });

        function addFilm() {

            const film = {
                id: Math.max(...allFilms.map(f => f.id)) + 1,
                ...newFilm
            };

            allFilms.push(film);
            // reset form
            newFilm.title = "";
            newFilm.year = "";
            newFilm.director = "";
            newFilm.genre = [];
            newFilm.rating = "";
            newFilm.duration = "";
            newFilm.description = "";
            newFilm.image = "";
            newFilm.price = "";
            showToast("Film was created.");
            router.push("/filmy/" + film.id);
        }

        return { newFilm, addFilm };
    }
};

export default AddFilmPage;