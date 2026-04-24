import React, { useState } from "react";
import './BollywoodMovies.css';

// 1. Define MovieCard OUTSIDE of the main component
// This prevents it from being re-created on every render.
const MovieCard = ({ movie, isFavorite, onToggle }) => {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h3>{movie.title} <span style={{color: '#a0aec0', fontSize: '0.8em'}}>{movie.year}</span></h3>
        <div>
          <span className="rating-badge">⭐ {movie.rating}</span>
          <span className="tags">{movie.tags.join(' · ')}</span>
        </div>
      </div>
      
      <button 
        onClick={onToggle}
        style={{ 
          backgroundColor: isFavorite ? '#fc8181' : '#edf2f7', 
          color: isFavorite ? 'white' : '#4a5568' 
        }}
      >
        {isFavorite ? '❤️ Favorited' : '🤍 Favorite'}
      </button>
    </div>
  );
};

// 2. Main Component
function BollywoodMovies() {
  const MOVIE_DATA = [
    { id: 1, title: "Interstellar", year: 2014, genre: "Sci-Fi", rating: 8.6, tags: ["Adventure", "Space", "Time"] },
    { id: 2, title: "Star Wars: A New Hope", year: 1977, genre: "Sci-Fi", rating: 8.6, tags: ["Space Opera", "Rebels", "Force"] },
    { id: 3, title: "The Star", year: 2017, genre: "Animation", rating: 6.1, tags: ["Family", "Journey", "Friends"] },
  ];

  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // B2: Filtering Logic
  const filteredMovies = MOVIE_DATA.filter(movie => 
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  // B4: Favorite Toggle Logic
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="container">
      {/* B1: Search Input */}
      <header>
        <h1>Movie Explorer</h1>
        <p>Search, filter, and favorite movies. Designed for a single-page React component structure.</p>
        <input 
          type="text" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
          placeholder="Search movies (e.g. 'Star')" 
        />
        <button onClick={() => setQuery("")}>Reset</button>
      </header>

      <div className="main-content" style={{ display: 'flex', gap: '20px' }}>
        {/* B3: Conditional Rendering for Matching Movies */}
        <section style={{ flex: 2 }}>
            {/* The dynamic counter logic */}
            {query && (
                <p style={{ color: '#718096', marginBottom: '15px', fontSize: '0.9em' }}>
                Found <strong>{filteredMovies.length}</strong> {filteredMovies.length === 1 ? 'result' : 'results'} for "{query}"
                </p>
            )}

            <h2>Matching Movies</h2>
            
            {query === "" ? (
                <p>Please enter a search term.</p>
            ) : filteredMovies.length === 0 ? (
                <p>No movies found for "{query}"</p>
            ) : (
                filteredMovies.map(movie => (
                <MovieCard 
                    key={movie.id} 
                    movie={movie} 
                    isFavorite={favorites.includes(movie.id)}
                    onToggle={() => toggleFavorite(movie.id)}
                />
                ))
            )}
        </section>

        {/* B5: Display Favourites */}
        <aside style={{ flex: 1, borderLeft: '1px solid #ddd', paddingLeft: '20px' }}>
          <h2>Favorite Movies</h2>
          {favorites.length === 0 ? (
            <p>You haven't added any favorites yet.</p>
          ) : (
            <ul>
              {MOVIE_DATA.filter(m => favorites.includes(m.id)).map(m => (
                <li key={m.id} style={{ marginBottom: '8px' }}>
                   {m.title} ({m.year})
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </div>
  );
}

export default BollywoodMovies;