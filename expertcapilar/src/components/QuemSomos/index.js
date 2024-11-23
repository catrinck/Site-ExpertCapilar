import styled from 'styled-components';
import Logo from '../Logo'

const Section = styled.section`
  width: 100%;
  padding: 50px 20px;
  text-align: center;
  background: #fff;
  position: relative;
  overflow: hidden;
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  color: #000;
  margin-bottom: 30px;
`;

const BackgroundText = styled.div`
  font-size: 100px;
  color: rgba(0, 0, 0, 0.05);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
  pointer-events: none;
`;

const Content = styled.div`
  z-index: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center; /* Alinha todos os itens ao centro horizontalmente */
  justify-content: center; /* Centraliza verticalmente */
  text-align: center;

  img {
    max-width: 150px;
    margin-bottom: 20px;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }

  button {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    padding: 10px 20px;
    background: #000;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background: #444;
    }
  }
`;

function QuemSomos() {
  return (
    <Section>
      <BackgroundText>Expert Capilar</BackgroundText>
      <Content>
          <Logo />  
          <Title>Quem Somos</Title>
          <p>Av. Ramos Ferreira, 1416, </p>
          <p>Centro, Manaus, AM</p>
          <p>Contato: (92) 99999-9999</p>
      </Content>
    </Section>
  );
}

export default QuemSomos;
