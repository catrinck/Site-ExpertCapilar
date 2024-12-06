import React from 'react';
import styled from 'styled-components';
import ImageCarousel from 'C:\\Users\\catri\\ExpertCapilar\\expertcapilar\\src\\assets\\ImagesCarousel.js'; // Importe o carrossel

const QuemSomosContainer = styled.div`
  text-align: center;
  padding: 20px;

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

function QuemSomosPage() {
  return (
    <div>
      <QuemSomosContainer>
        <h1>Sobre Nós</h1>
        <p>Somos uma empresa especializada em cuidar do seu cabelo!</p>
        <p>Endereço: Av. Ramos Ferreira, 1416, Centro, Manaus, AM</p>
        <p>Contato: (92) 91037757</p>
        <h2>Localização</h2>
      </QuemSomosContainer>

      {/* Carrossel de imagens */}
      <ImageCarousel />
    </div>
  );
}

export default QuemSomosPage;
