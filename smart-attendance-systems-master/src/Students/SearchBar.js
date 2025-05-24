import React from 'react';
import './Students';

const SearchBar = ({ searchQuery }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="search students"
        onChange={(e) => searchQuery(e.target.value)}
      />
    </div>
  );
};

export default SearchBar;