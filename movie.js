const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');

document.getElementById('back-button').addEventListener('click', () => {
    window.history.back();
  });

async function fetchMovieDetails(movieId) {
  const apiKey = '7d94d40ee173cf65d6901779566190dc';
  const apiUrl = 'https://api.themoviedb.org/3/';
  const response = await fetch(`${apiUrl}movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=videos,credits,images`);
  return response.json();
}


async function fetchActorWikiPage(actorName) {
    const apiUrl = 'https://en.wikipedia.org/w/api.php?';
    const params = new URLSearchParams({
      action: 'query',
      list: 'search',
      srsearch: actorName,
      format: 'json',
      origin: '*'
    });
  
    const response = await fetch(`${apiUrl}${params}`);
  
    if (response.ok) {
      const data = await response.json();
      if (data.query.search.length > 0) {
        const pageName = data.query.search[0].title;
        const actorWikiUrl = `https://en.wikipedia.org/wiki/${encodeURIComponent(pageName)}`;
        return actorWikiUrl;
      }
    }
  
    return null;
  }

async function displayRecommendedMovies(genreId) {
    const recommendedMovies = await fetchRecommendations(genreId);
    const recommendedMoviesElement = document.getElementById('recommended-movies');
    recommendedMoviesElement.innerHTML = '<h2>Recommended Movies</h2>';
    recommendedMovies.results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'movie-box';
      const movieLink = document.createElement('a');
      movieLink.href = `movie.html?id=${movie.id}`;
      const movieImage = document.createElement('img');
      movieImage.src = `https://image.tmdb.org/t/p/w200${movie.poster_path}`;
      movieImage.alt = movie.title;
      movieImage.className = 'movie-image';
      movieLink.appendChild(movieImage);
      movieElement.appendChild(movieLink);
      recommendedMoviesElement.appendChild(movieElement);
    });
  }

async function displayMovieDetails() {
  const movieDetails = await fetchMovieDetails(movieId);

  const genreId = movieDetails.genres[0].id;
  displayRecommendedMovies(genreId);

  document.getElementById('movie-poster').src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;

  const imageWheel = document.getElementById('image-wheel');
  movieDetails.images.backdrops.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = `https://image.tmdb.org/t/p/w200${image.file_path}`;
    imageWheel.appendChild(imageElement);
  });

  const trailer = movieDetails.videos.results.find(video => video.type === 'Trailer');
  if (trailer) {
    const trailerElement = document.createElement('iframe');
    trailerElement.src = `https://www.youtube.com/embed/${trailer.key}`;
    trailerElement.allowFullscreen = true;
    document.getElementById('movie-trailer').appendChild(trailerElement);
  }

  const recommendedMoviesElement = document.createElement('div');
  recommendedMoviesElement.id = 'recommended-movies';

  movieDetails.images.backdrops.forEach(image => {
    const imageElement = document.createElement('img');
    imageElement.src = `https://image.tmdb.org/t/p/w200${image.file_path}`;
    recommendedMoviesElement.appendChild(imageElement);
  });

  document.querySelector('.movie-poster').appendChild(recommendedMoviesElement);

  const creditsElement = document.getElementById('movie-credits');
  
  const castElements = await Promise.all(movieDetails.credits.cast.map(async (cast) => {
    const castElement = document.createElement('div');
    castElement.className = 'cast-box';

    const castLink = document.createElement('a');
    const actorWikiLink = await fetchActorWikiPage(cast.name);

    if (actorWikiLink) {
      castLink.href = actorWikiLink;
    }

    const castImage = document.createElement('img');
    castImage.src = `https://image.tmdb.org/t/p/w200${cast.profile_path}`;
    castImage.alt = cast.name;
    castImage.className = 'cast-image';

    const castName = document.createElement('span');
    castName.textContent = cast.name;
    castName.className = 'cast-name';

    castLink.appendChild(castImage);
    castLink.appendChild(castName);
    castElement.appendChild(castLink);

    return castElement;
  }));

  castElements.forEach(castElement => creditsElement.appendChild(castElement));
}

displayMovieDetails();