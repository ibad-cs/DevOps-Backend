function filterMovies(movies) {
    for (let i = movies.length - 1; i >= 0; i--) {
      if (movies[i].Poster === 'N/A') {
        movies.splice(i, 1);
      }
    }
    return movies;
  }

module.exports = filterMovies