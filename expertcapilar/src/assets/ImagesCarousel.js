import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 80%;
  position: relative;
`;

const ImageList = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${(props) => props.translate}px);
`;

const ImageItem = styled.img`
  width: 300px;
  height: 200px;
  object-fit: cover;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
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

  &:hover {
    background-color: #e52e26;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

function ImageCarousel() {
  const images = [
    'https://via.placeholder.com/300x200.png?text=Foto+1',
    'https://via.placeholder.com/300x200.png?text=Foto+2',
    'https://via.placeholder.com/300x200.png?text=Foto+3',
    'https://via.placeholder.com/300x200.png?text=Foto+4',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <CarouselContainer>
      <CarouselWrapper>
        <LeftArrow onClick={handlePrev} disabled={currentIndex === 0}>
          &#8249;
        </LeftArrow>
        <ImageList translate={-currentIndex * 320}>
          {images.map((src, index) => (
            <ImageItem src={src} alt={`Foto ${index + 1}`} key={index} />
          ))}
        </ImageList>
        <RightArrow onClick={handleNext} disabled={currentIndex === images.length - 1}>
          &#8250;
        </RightArrow>
      </CarouselWrapper>
    </CarouselContainer>
  );
}

export default ImageCarousel;




