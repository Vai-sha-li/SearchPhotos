import React from 'react';

function ImageModal({ image, closeModal }) {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="image-modal">
        <img src={image.url} alt={image.title} />
      </div>
    </div>
  );
}

export default ImageModal;