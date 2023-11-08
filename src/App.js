// App.js
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ImageGrid from './components/ImageGrid';
import ImageModal from './components/ImageModal';
import './styles/styles.css';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(false);

  const fetchImages = (query, page) => {
    // Replace 'YOUR_FLICKR_API_KEY' with your actual Flickr API key
    const apiKey = '50e34524fe735d8f17f9db5856100219';
    const perPage = 1000; // Number of results per page

    // Construct the URL for the Flickr API request
    const flickrEndpoint = 'https://api.flickr.com/services/rest/';
    const url = `${flickrEndpoint}?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&safe_search=1&text=${query}&page=${page}&per_page=${perPage}`;

    // Make the API request using the fetch function
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // Extract image data from the response and update searchResults state
        const photos = data.photos.photo;
        const newResults = photos.map((photo) => ({
          id: photo.id,
          title: photo.title,
          url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}_c.jpg`,
        }));
        setSearchResults((prevResults) => (page === 1 ? newResults : [...prevResults, ...newResults]));
      })
      .catch((error) => {
        console.error('Error fetching images:', error);
      });
  };

  const handleSearch = (query) => {
    setPage(1);
    fetchImages(query, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    fetchImages(searchResults, nextPage);
    setPage(nextPage);
  };
  useEffect(() => {
    fetchImages('recent', 1); // Fetch recent images with an empty query
  }, []);

  return (
    <div>
      <Header onSearch={handleSearch} />
      <ImageGrid searchResults={searchResults} onLoadMore={loadMore} />
      {selectedImage && (
        <ImageModal image={selectedImage} closeModal={() => setSelectedImage(null)} />
      )}
    </div>
  );
}

export default App;
