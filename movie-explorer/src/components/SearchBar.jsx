import React from 'react';

export default function SearchBar({ searchQuery, setSearchQuery, handleReset }) {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        placeholder="Search movies (e.g. 'Interstellar', 'Star')" 
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      {searchQuery && <button className="clear-icon" onClick={handleReset}>✕</button>}
      <button className="reset-btn" onClick={handleReset}>⟳ Reset</button>
    </div>
  );
}