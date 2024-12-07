import React, { useState } from 'react';
import styled from 'styled-components';
import { biographyData } from './data';

const Container = styled.div`
  background: #121212;
  width: 100%;
  padding: 40px 20px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;

  @media (max-width: 768px) {
    padding: 20px 0px;
    gap: 15px;
  }
`;

const SlideContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    padding: 0 10px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 400px;

  @media (max-width: 768px) {
    max-width: 280px;
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px #00000033;
  transition: transform 0.3s ease;

  @media (max-width: 768px) {
    border-radius: 8px;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  color: #FFFFFF;
  text-align: left;

  @media (max-width: 768px) {
    text-align: center;
    padding: 0 10px;
  }
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-bottom: 15px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #E0E0E0;

  @media (max-width: 768px) {
    font-size: 16px;
    line-height: 1.5;
  }
`;

const NavigationButton = styled.button`
  background: #FF342B;
  color: #FFFFFF;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  &:hover {
    background: #E52E26;
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 20px;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;

  @media (max-width: 768px) {
    gap: 15px;
    margin-top: 15px;
  }
`;

function Biography() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? biographyData.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === biographyData.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Container id="biography">
      <SlideContainer>
        <ImageContainer>
          <Image 
            src={biographyData[currentIndex].image} 
            alt={biographyData[currentIndex].title}
            loading="lazy"
          />
        </ImageContainer>
        <TextContainer>
          <Title>{biographyData[currentIndex].title}</Title>
          <Text>{biographyData[currentIndex].text}</Text>
        </TextContainer>
      </SlideContainer>
      <NavigationContainer>
        <NavigationButton onClick={handlePrev} aria-label="Previous">←</NavigationButton>
        <NavigationButton onClick={handleNext} aria-label="Next">→</NavigationButton>
      </NavigationContainer>
    </Container>
  );
}

export default Biography;