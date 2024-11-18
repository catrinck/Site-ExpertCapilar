import Header from '../components/Header'
import styled from 'styled-components'
import Pesquisa from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';

const HomeContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
`


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
