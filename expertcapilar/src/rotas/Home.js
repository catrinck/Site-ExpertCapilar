import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Pesquisa } from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';
import QuemSomos from '../components/QuemSomos';

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    #agendamentos {
      order: 1; /* Define a seção Agendamentos para aparecer primeiro */
    }
    #profissionais {
      margin-top: 20px;
      order: 2; /* Define a seção Profissionais para aparecer depois */
    }
    #quem-somos {
      order: 3; /* Define a seção Quem Somos para aparecer por último */
    }
  }
`;

function Home() {
  return (
    <div style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden' }}>
      <Header />
      <HomeContainer>
        {/* Seção Nossos Profissionais */}
        <div id="profissionais">
          <Pesquisa />
        </div>
        {/* Seção Agendamentos Disponíveis */}
        <div id="agendamentos">
          <Agendamentos />
        </div>
        {/* Botão "Quem Somos" */}
        <div id="quem-somos">
          <QuemSomos />
        </div>
      </HomeContainer>
    </div>
  );
}

export default Home;
