import React, { useState, useEffect } from 'react';

export const ImageCarousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [images]);

  if (!images || images.length === 0) return null;

  return (
    <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '1.5rem', borderRadius: '4px', overflow: 'hidden', border: '1px solid var(--border)' }}>
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`Slide ${index}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'top',
            opacity: index === currentIndex ? 1 : 0,
            transition: 'opacity 0.8s ease-in-out',
          }}
        />
      ))}
      {images.length > 1 && (
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '0',
          right: '0',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          zIndex: 10
        }}>
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: index === currentIndex ? 'var(--accent)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                transition: 'background 0.3s ease'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
