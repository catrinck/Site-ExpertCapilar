import Header from '../components/Header'
import styled from 'styled-components'
import { Pesquisa } from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';


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
  }
`;

function Home() {
  return (
    <div>
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
      </HomeContainer>
    </div>
  );
}

export default Home;
