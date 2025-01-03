import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import { Pesquisa } from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';
import QuemSomos from '../components/QuemSomos';
import { Helmet } from 'react-helmet-async';
import ImageCarousel from '../components/ImagesCarousel/index.js';
import Biography from '../components/Biography';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: #121212;
  gap: 0;
 
  #agendamentos {
    order: 1;
  }
  #profissionais {
    order: 2;
  }
  #biography {
    order: 3;
  }
  #carousel {
    order: 4;
  }
  #quem-somos {
    order: 5;
  }
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
        <div id="biography">
          <Biography />
        </div>
        <div id="quem-somos">
          <QuemSomos />
          <ImageCarousel />
        </div>
      </HomeContainer>
    </div>
  );
}

export default Home;