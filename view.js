function populateGenresNav(genres) {
    const genreNav = document.getElementById('genre-nav');
    genres.forEach(genre => {
      const genreLink = document.createElement('a');
      genreLink.href = '#';
      genreLink.textContent = genre.name;
      genreLink.addEventListener('click', () => {
        getRecommendations(genre.id);
      });
      genreNav.appendChild(genreLink);
    });
  }
  
  async function displayPopularMovies() {
    const popularMovies = await fetchPopularMovies();
    displayMovies(popularMovies.results);
  }
  

function displayMovies(movies) {
    const movieListDiv = document.getElementById('movie-list');
    movieListDiv.innerHTML = ''; 
  
    const movieGrid = document.createElement('div');
    movieGrid.className = 'movie-grid';
  
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.className = 'movie-box';
  
      const movieLink = document.createElement('a');
      movieLink.href = `movie.html?id=${movie.id}`;
  
      const movieImage = document.createElement('img');
      movieImage.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
      movieImage.alt = `${movie.title} Poster`;
      movieImage.className = 'movie-image';
  
      movieLink.appendChild(movieImage);
      movieElement.appendChild(movieLink);
  
      const movieTitle = document.createElement('div');
      movieTitle.className = 'movie-title';
      movieTitle.textContent = movie.title;
  
      movieElement.appendChild(movieTitle);
      movieGrid.appendChild(movieElement);
    });
  
    movieListDiv.appendChild(movieGrid);
  }