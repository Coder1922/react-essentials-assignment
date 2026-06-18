import React from 'react';

export default function MovieCard({ movie, isFav, toggleFavorite }) {
  return (
    <div className="movie-card">
      <div className="movie-info">
        <h4>{movie.title} <span>{movie.year} · {movie.genre}</span></h4>
        <div className="movie-meta">
          <span className="rating">⭐ {movie.rating}</span>
          <span className="tags">{movie.tags}</span>
        </div>
      </div>
      <button 
        className={`fav-btn ${isFav ? 'favorited' : ''}`}
        onClick={() => toggleFavorite(movie)}
      >
        {isFav ? '❤️ Favorited' : '♡ Favorite'}
      </button>
    </div>
  );
}