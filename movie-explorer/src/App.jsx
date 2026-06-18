import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import MovieCard from './components/MovieCard';
import FavoritesSidebar from './components/FavoritesSidebar';
import { MOVIE_DATA } from './data/movies';
import './App.css';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);

  const handleReset = () => setSearchQuery('');

  const toggleFavorite = (movie) => {
    if (favorites.some((fav) => fav.id === movie.id)) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  // UPDATED LOGIC: If searchQuery is empty, show all movies. Otherwise, filter them.
  const filteredMovies = searchQuery.trim() === '' 
    ? MOVIE_DATA 
    : MOVIE_DATA.filter((movie) =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
      );

  return (
    <div className="app-container">
      <div className="header">
        <h1>Movie Explorer</h1>
        <p>Search, filter, and favorite movies. Designed for a single-page React component structure.</p>
      </div>

      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        handleReset={handleReset} 
      />

      {searchQuery && (
        <div className="results-count">
          {filteredMovies.length} results for "{searchQuery}"
        </div>
      )}

      <div className="content-grid">
        <div className="movies-column">
          <div className="column-header">
            <h3>Movies</h3>
            <span>Local movie data</span>
          </div>

          {filteredMovies.length === 0 ? (
            <p className="empty-state">No movies found matching your search.</p>
          ) : (
            filteredMovies.map((movie) => (
              <MovieCard 
                key={movie.id} 
                movie={movie} 
                isFav={favorites.some((fav) => fav.id === movie.id)}
                toggleFavorite={toggleFavorite}
              />
            ))
          )}
        </div>

        <FavoritesSidebar favorites={favorites} />
      </div>
    </div>
  );
}