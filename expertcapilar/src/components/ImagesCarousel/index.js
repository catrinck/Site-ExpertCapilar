import React, { useState, useEffect, useCallback } from 'react';
import {
  CarouselContainer,
  CarouselWrapper,
  ImageList,
  ImageItem,
  LeftArrow,
  RightArrow
} from './styles';

const TOUCH_THRESHOLD = 50;

function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [slidesPerView, setSlidesPerView] = useState(3);
  
  const images = [
    'https://via.placeholder.com/300x200.png?text=Foto+1',
    'https://via.placeholder.com/300x200.png?text=Foto+2',
    'https://via.placeholder.com/300x200.png?text=Foto+3',
    'https://via.placeholder.com/300x200.png?text=Foto+4',
    'https://via.placeholder.com/300x200.png?text=Foto+1',
    'https://via.placeholder.com/300x200.png?text=Foto+2',
    'https://via.placeholder.com/300x200.png?text=Foto+1',
    'https://via.placeholder.com/300x200.png?text=Foto+2',
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setSlidesPerView(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesPerView(2);
      } else {
        setSlidesPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  }, []);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => Math.min(prev + 1, Math.ceil(images.length / slidesPerView) - 1));
  }, [images.length, slidesPerView]);

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!touchStart) return;
    
    const distance = touchStart - e.touches[0].clientX;
    if (Math.abs(distance) > TOUCH_THRESHOLD) {
      if (distance > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setTouchStart(null);
    }
  };

  const slideWidth = 100 / slidesPerView;
  const translateValue = -(currentIndex * 100) / Math.ceil(images.length / slidesPerView);

  return (
    <CarouselContainer>
      <CarouselWrapper
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={() => setTouchStart(null)}
      >
        <LeftArrow 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          aria-label="Previous slide"
        >
          &#8249;
        </LeftArrow>
        <ImageList translate={translateValue}>
          {images.map((src, index) => (
            <ImageItem
              key={`slide-${index}`}
              src={src}
              alt={`Slide ${index + 1}`}
              slideWidth={slideWidth}
              loading="lazy"
            />
          ))}
        </ImageList>
        <RightArrow 
          onClick={handleNext}
          disabled={currentIndex >= Math.ceil(images.length / slidesPerView) - 1}
          aria-label="Next slide"
        >
          &#8250;
        </RightArrow>
      </CarouselWrapper>
    </CarouselContainer>
  );
}

export default ImageCarousel;