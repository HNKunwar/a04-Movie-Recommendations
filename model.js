const apiKey = '7d94d40ee173cf65d6901779566190dc';
const apiUrl = 'https://api.themoviedb.org/3/';

async function fetchGenres() {
  const response = await fetch(`${apiUrl}genre/movie/list?api_key=${apiKey}&language=en-US`);
  return response.json();
}

async function fetchRecommendations(genreId) {
  const response = await fetch(`${apiUrl}discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreId}`);
  return response.json();
}

async function fetchMovieDetails(movieId) {
  const response = await fetch(`${apiUrl}movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits,images`);
  return response.json();
}

async function fetchPopularMovies() {
  const response = await fetch(`${apiUrl}movie/popular?api_key=${apiKey}&language=en-US&page=1`);
  return response.json();
}

document.getElementById('back-button').addEventListener('click', () => {
  window.location.href = 'index.html';
});