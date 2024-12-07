// src/components/Biography/index.js
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
    padding: 20px 20px 0;
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
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1;
  max-width: 400px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 4px 6px #00000033;
`;

const TextContainer = styled.div`
  flex: 1;
  color: #FFFFFF;
  text-align: left;
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 20px;
  font-family: 'Poppins', sans-serif;
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.6;
  color: #E0E0E0;
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
  transition: background-color 0.3s;

  &:hover {
    background: #E52E26;
  }
`;

const NavigationContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
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
          <Image src={biographyData[currentIndex].image} alt={biographyData[currentIndex].title} />
        </ImageContainer>
        <TextContainer>
          <Title>{biographyData[currentIndex].title}</Title>
          <Text>{biographyData[currentIndex].text}</Text>
        </TextContainer>
      </SlideContainer>
      <NavigationContainer>
        <NavigationButton onClick={handlePrev}>←</NavigationButton>
        <NavigationButton onClick={handleNext}>→</NavigationButton>
      </NavigationContainer>
    </Container>
  );
}

export default Biography;