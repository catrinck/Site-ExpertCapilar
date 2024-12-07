import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Pesquisa } from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';
import QuemSomos from '../components/QuemSomos';
import { Helmet } from 'react-helmet-async';
import ImageCarousel from '../components/images/index.js';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #121212;

  @media (max-width: 768px) {
    #agendamentos {
      order: 1;
      margin-bottom: 0;
    }
    #profissionais {
      margin-top: 0;
      order: 2;
    }
    #quem-somos {
      order: 3;
      margin-top: 0;
    }
  }
`;

const CarouselSection = styled.div`
  background: #121212;
  width: 100%;
  padding: 20px 0;
`;

function Home() {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', background: '#121212' }}>
      <Helmet>
        <title>ExpertCapilar</title>
        <meta name="description" content="Bem-vindo ao nosso site!" />
      </Helmet>
      <Header />
      <HomeContainer>
        <div id="profissionais">
          <Pesquisa />
        </div>
        <div id="agendamentos">
          <Agendamentos />
        </div>
        <div id="quem-somos">
          <QuemSomos />
        </div>
        <CarouselSection>
          <ImageCarousel />
        </CarouselSection>
      </HomeContainer>
    </div>
  );
}

export default Home;