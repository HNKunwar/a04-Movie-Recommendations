async function init() {
    const genres = await fetchGenres();
    populateGenresDropdown(genres.genres);
}

async function getRecommendations() {
    const genreSelect = document.getElementById('genre-select');
    const genreId = genreSelect.value;
    const recommendations = await fetchRecommendations(genreId);
    displayMovies(recommendations.results);
}

async function init() {
    const genres = await fetchGenres();
    populateGenresNav(genres.genres);
    await displayPopularMovies();
  }
  
  async function getRecommendations(genreId) {
    const recommendations = await fetchRecommendations(genreId);
    displayMovies(recommendations.results);
  }