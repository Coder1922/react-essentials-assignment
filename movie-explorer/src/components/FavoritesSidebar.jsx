import React from 'react';

export default function FavoritesSidebar({ favorites }) {
  return (
    <div className="favorites-column">
      <div className="column-header">
        <h3>Favorite Movies</h3>
        <span>Derived from favorite state</span>
      </div>
      
      {favorites.length === 0 ? (
        <p className="empty-state">You haven't added any favorites yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((fav) => (
            <li key={fav.id}>♡ {fav.title} ({fav.year})</li>
          ))}
        </ul>
      )}
    </div>
  );
}