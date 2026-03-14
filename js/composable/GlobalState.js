const { reactive, ref } = Vue;

const allFilms = reactive([]);
const allGenres = reactive([]);
const allDirectors = reactive([]);

const filteredFilms = reactive([]);
const isLoaded = ref(false);
const isLoggedIn = ref(0);
const LoggedUsername = ref("");
const oblubeneFilmy = reactive([]);

function loadFilms() {
    if (isLoaded.value) return;

    fetch("./data/movies.json")
        .then(r => r.json())
        .then(data => {
            allFilms.push(...data);
            filteredFilms.push(...data);

            data.forEach(item =>
                (item.genre || []).forEach(genre => {
                    if (!allGenres.includes(genre)) allGenres.push(genre);
                })
            );
            data.forEach(item => {
                if (item.director && !allDirectors.includes(item.director)) {
                    allDirectors.push(item.director);
                }
            });


            isLoaded.value = true;
        })
        .catch(err => console.error("Chyba pri načítaní filmov:", err));
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function useGlobalState() {
    loadFilms();
    return { allFilms, allGenres, allDirectors, filteredFilms, isLoaded, isLoggedIn, LoggedUsername, oblubeneFilmy, showToast };
}

export { useGlobalState };