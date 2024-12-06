import React from 'react';
import styled from 'styled-components';
import ImageCarousel from '../components/images/index.js';

const QuemSomosContainer = styled.div`
  background: #121212;
  color: #ffffff;
  text-align: center;
  padding: 20px;
  width: 100%;

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 20px;
  }
  h2 {
    font-size: 2.0rem;
    font-weight: bold;
    margin-bottom: 80px;
    text-align: bottom;
  }

  p {
    font-size: 1.2rem;
    line-height: 1.6;
    margin: 10px 0;
  }
`;

// New container for carousel
const CarouselSection = styled.div`
  background: #121212;
  width: 100%;
  padding: 20px 0;
`;

function QuemSomosPage() {
  return (
    <div style={{ background: '#121212', minHeight: '100vh' }}>
      <QuemSomosContainer>
        <h1>Sobre Nós</h1>
        <p>Somos uma empresa especializada em cuidar do seu cabelo!</p>
        <p>Endereço: Av. Ramos Ferreira, 1416, Centro, Manaus, AM</p>
        <p>Contato: (92) 91037757</p>
        <h2>Localização</h2>
      </QuemSomosContainer>

      <CarouselSection>
        <ImageCarousel />
      </CarouselSection>
    </div>
  );
}

export default QuemSomosPage;