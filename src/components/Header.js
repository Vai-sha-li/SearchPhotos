import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css'

function Header({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    // Load saved search queries from local storage
    const savedQueries = JSON.parse(localStorage.getItem('searchQueries')) || [];
    setSuggestions(savedQueries);
  }, []);

  const handleSearch = () => {
    onSearch(searchQuery);
    // Save the search query to local storage
    const savedQueries = [...suggestions, searchQuery];
    localStorage.setItem('searchQueries', JSON.stringify(savedQueries));
    setSuggestions(savedQueries);
  };

  const clearHistory = () => {
    // Clear the search history and update state
    localStorage.removeItem('searchQueries');
    setSuggestions([]);
  };

  const handleSuggestionClick = (query) => {
    // Set the search query and trigger a search
    setSearchQuery(query);
    onSearch(query);
    setShowDropdown(false);
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query === '') {
      setShowDropdown(false);
    } else {
      setShowDropdown(true);
    }
  };

  const handleInputBlur = () => {
    // Use a delay to allow time for clicking on suggestions
    setTimeout(() => {
      setShowDropdown(false);
    }, 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearButtonStyle = {
    cursor: 'pointer',
    color: 'red',
    fontSize: '14px',
    textAlign: 'right',
    marginTop: '8px',
  };

  return (
    <header style={{ backgroundColor: 'black', padding: '20px', textAlign: 'center', color: 'white', fontSize:'25px'}}>
      <h2>Search Photos</h2>
      <div className="search-container" style={{ position: 'relative'}}>
        <input
          type="text"
          placeholder="Search for images..."
          value={searchQuery}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          onBlur={handleInputBlur}
          onKeyPress={handleKeyPress}
          ref={inputRef}
        />
        <button onClick={handleSearch}>Search</button>
        {showDropdown && suggestions.length > 0 && (
          <div className="dropdown" style={{ width: '400px', left: '50%', transform: 'translateX(-50%)', color: 'black' }}>
            {suggestions.map((query, index) => (
              <div
                key={index}
                className="dropdown-item"
                onClick={() => handleSuggestionClick(query)}
              >
                {query}
              </div>
            ))}
            <div
              className="dropdown-item"
              style={clearButtonStyle}
              onClick={clearHistory}
            >
              Clear
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
