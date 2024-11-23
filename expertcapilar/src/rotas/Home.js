import Header from '../components/Header'
import styled from 'styled-components'
import Pesquisa from '../components/Pesquisa';
import Agendamentos from '../components/Agendamento';
import QuemSomos from '../components/QuemSomos'

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

        <div id="quem-somos">
          <QuemSomos />
        </div>
      </HomeContainer>
    </div>
  );
}

export default Home;
