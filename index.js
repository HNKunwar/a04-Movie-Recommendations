document.addEventListener('DOMContentLoaded', init);
document.getElementById('get-recommendations').addEventListener('click', getRecommendations);

function handleMovieClick(event) {
  if (event.target.classList.contains('movie-image')) {
    const movieId = event.target.dataset.movieId;
    window.location.href = `movie.html?id=${movieId}`;
  }
}

document.getElementById('movie-list').addEventListener('click', handleMovieClick);