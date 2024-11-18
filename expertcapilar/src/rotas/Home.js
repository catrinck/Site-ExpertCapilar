import Header from '../components/Header'
import styled from 'styled-components'
import Pesquisa from '../components/Pesquisa';

const HomeContainer = styled.div`
  width: 100vw;
  height: 80vh;
  display: flex;
  flex-direction: column;
`


function Home() {
  return (
    <div>
      <HomeContainer>
        <Pesquisa />
      </HomeContainer>
    </div>
    );
}

export default Home;
