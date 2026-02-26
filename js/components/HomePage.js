const HomePage = {
    template: `
    <div class="home-container">
    <section class="hero">
        <h1>Welcome to Forrai Film Catalog</h1>
        <p>
            Forrai Film Catalog is a website that provides an overview of movies, their ratings, and reviews.
            Discover new movies, check their ratings, and find your next movie experience.
        </p>
        <p class="subtitle">
            Similar to CSFD – a place for movie lovers all in one spot.
        </p>
    </section>

    <section class="features">
        <div class="feature-box">
            <h2>Movie Database</h2>
            <p>Browse movies by genre, year, or rating.</p>
        </div>

        <div class="feature-box">
            <h2>Add Movies</h2>
            <p>Add new movies to the database and share your favorite films with others.</p>
        </div>
    </section>
</div>

    `,
    props: {},
    setup() {
        return {}
    }
}

export default HomePage;