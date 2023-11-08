// ImageGrid.js
import React, { useState, useEffect } from 'react';

function ImageGrid({ searchResults, onLoadMore }) {
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      if (!isLoadingMore) {
        setIsLoadingMore(true);
        onLoadMore();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
    gap: '20px', // Adjust the gap between images as needed
  };

  const imageItemStyle = {
    width: '300px', // Adjust the width for medium-sized images
    height: 'auto', // Maintain aspect ratio
    display: 'flex',
    justifyContent: 'center',
    
  };
  const imageStyleWithLeftMargin = {
    ...imageItemStyle,
    margin: '5%', // Adjust the left margin as needed
  };

  const loaderStyle = {
    fontSize: '16px',
  };

  return (
    <div className="image-grid" style={gridStyle}>
      {searchResults.map((result) => (
        <div key={result.id} className="image-item">
          <img src={result.url} alt={result.title} style={imageStyleWithLeftMargin} />
        </div>
      ))}
      {isLoadingMore && <div className="loader" style={loaderStyle}>Loading...</div>}
    </div>
  );
}

export default ImageGrid;
