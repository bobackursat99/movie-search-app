import React, { useState } from 'react';
 // Render the list of favorite movies
function FavoritesList({ favorites, removeFromFavorites }) {
    return (
      <div className="favorites-list">
        <h2>Favorites</h2>
        {favorites.map((favorite) => (
          <div key={favorite.imdbID} className="movie-card">
            <h3>{favorite.Title}</h3>
            <p>Year: {favorite.Year}</p>
            <button onClick={() => removeFromFavorites(favorite)}>Remove</button>
          </div>
        ))}
      </div>
    );
  }

  export default FavoritesList;