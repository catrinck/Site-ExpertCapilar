import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 80%;
  position: relative;
  touch-action: pan-y pinch-zoom;
  
  @media (max-width: 768px) {
    width: 95%;
  }
`;

const ImageList = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}%);
`;

const ImageItem = styled.img`
  width: ${props => props.slideWidth}%;
  height: 200px;
  object-fit: cover;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const ArrowButton = styled.button`
  background-color: #ff342b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #e52e26;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

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
    if (Math.abs(distance) > 50) {
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