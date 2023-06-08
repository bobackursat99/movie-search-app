import React, { useState } from 'react';
import axios from 'axios';
import MovieDetails from './components/MovieDetails';
import FavoritesList from './components/FavoritesList';
import './App.css';

const API_KEY = 'bcbd65da';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [favorites, setFavorites] = useState([]);
 // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
// Handle search form submission
  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${searchTerm}`);
      const data = response.data;
      setMovies(data.Search || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle click on a movie
  const handleMovieClick = async (imdbID) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}`);
      const data = response.data;
      setSelectedMovie(data);
    } catch (error) {
      console.error(error);
    }
  };
  // Add a movie to favorites
  const addToFavorites = (movie) => {
    setFavorites((prevFavorites) => [...prevFavorites, movie]);
  };
// Remove a movie from favorites
  const removeFromFavorites = (movie) => {
    setFavorites((prevFavorites) => prevFavorites.filter((favMovie) => favMovie.imdbID !== movie.imdbID));
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search movies..." />
        <button type="submit">Search</button>
      </form>
      <div className="content">
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <img src={movie.Poster} alt={movie.Title} />
              <button onClick={() => handleMovieClick(movie.imdbID)}>Details</button>
              {selectedMovie && selectedMovie.imdbID === movie.imdbID && (
                <MovieDetails movie={selectedMovie} addToFavorites={addToFavorites} />
              )}
            </div>
          ))}
        </div>
      </div>
      <FavoritesList favorites={favorites} removeFromFavorites={removeFromFavorites} />
    </div>
  );
}



export default App;
