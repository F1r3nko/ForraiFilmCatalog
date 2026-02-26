const AddFilmPage = {
    template: `
    <h1>Add Film</h1>
    <div class="add-film-container">
    <form>
        <label>Title:</label>
        <input type="text" id="title" name="title">

        <label>Year:</label>
        <input type="number" id="year" name="year">

        <label>Director:</label>
        <input type="text" id="director" name="director">

        <label>Genre:</label>
        <select name="genre[]" multiple size="10">
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
        <input type="number" step="0.1" id="rating" name="rating">

        <label>Duration - min.:</label>
        <input type="number" id="duration" name="duration">

        <label>Description:</label>
        <input type="text" id="description" name="description">

        <label>Image:</label>
        <input type="text" id="image" name="image">

        <label>Price:</label>
        <input type="text" id="price" name="price">

        <button type="submit">Add film</button>
    </form>
</div>


        
        


        <button type="submit">Add Film</button>
    </form>
    `,
    props: {},
    setup() {
        return {}
    }

}
export default AddFilmPage;