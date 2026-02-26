const { ref } = Vue;
const { useRoute, useRouter } = VueRouter;

const FilmyDetailPage = {
    template: `
    <div class="movie-detail-page">
        <div class="movie-detail-card" v-if="film">
            <!-- Horný obrázok (ak existuje) -->
            <div class="movie-header-image" 
                 :style="{ backgroundImage: film.backdrop ? 'url(' + film.backdrop + ')' : 'none' }">
            </div>
            
            <div class="movie-content">
                <!-- Poster -->
                <div class="movie-poster">
                    <img v-if="film.image" :src="film.image" :alt="film.title">
                    <div v-else style="padding: 40px; text-align: center; color: #999;">bez obrázku</div>
                </div>

                <!-- Detail info -->
                <div class="movie-info">
                    <a href="#" @click.prevent="$router.back()" class="back-link">
                        ← Späť na zoznam
                    </a>
                    
                    <h1>{{ film.title }}</h1>
                    
                    <!-- Rating - bielo-šedý štýl s jemnou žltou hviezdou -->
                    <div class="rating-box">
                        <span class="star">★</span>
                        <span class="rating-value">{{ film.rating }}/10</span>
                    </div>

                    <div class="meta-info">
                        <div class="meta-item">
                            <span class="icon">📅</span> {{ film.year }}
                        </div>
                        <div class="meta-item" v-if="film.runtime">
                            <span class="icon">⏱️</span> {{ film.runtime }} min
                        </div>
                    </div>

                    <!-- Žánre -->
                    <div class="genre-list">
                        <span v-for="genre in film.genre" :key="genre" class="genre-item">
                            {{ genre }}
                        </span>
                    </div>

                    <!-- Réžia -->
                    <div class="director-block">
                        <div class="director-icon">🎬</div>
                        <div class="director-text">
                            <div class="director-label">Réžia</div>
                            <div class="director-name">{{ film.director }}</div>
                        </div>
                    </div>

                    <!-- Popis -->
                    <div class="description-section">
                        <h3>O filme</h3>
                        <p>{{ film.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading -->
        <div v-else class="loading-container">
            <div class="spinner"></div>
            <p style="color: #666;">Načítavam film...</p>
        </div>
    </div>
    `,
    setup() {
        const route = useRoute();
        const router = useRouter();
        const film = ref(null);

        fetch("../data/movies.json")
            .then(response => response.json())
            .then(data => {
                const foundFilm = data.find(item => item.id == route.params.id);
                if (foundFilm) {
                    film.value = {
                        ...foundFilm,
                        backdrop: foundFilm.backdrop || null,
                        runtime: foundFilm.runtime || 120 // dummy, ak nemáš
                    };
                }
            });

        return { film, route };
    }
}

export default FilmyDetailPage;