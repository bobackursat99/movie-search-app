import React, { useState } from 'react';
 // Render the movie details
function MovieDetails({ movie, addToFavorites }) {
    return (
      <div className="movie-details">
        <h2>{movie.Title}</h2>
        <p>Year: {movie.Year}</p>
        <p>Actors: {movie.Actors}</p>
        <p>IMDb Rating: {movie.imdbRating}</p>
        <p>Plot: {movie.Plot}</p>
        <button onClick={() => addToFavorites(movie)}>Add to Favorites</button>
      </div>
    );
  }

  export default MovieDetails;