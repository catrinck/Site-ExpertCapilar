import styled from 'styled-components';
import AboutLogo from '../Logo/quemsomosLogo';

const Section = styled.section`
  background: #121212;
  width: 100%;
  padding: 50px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 30px 5px;
    margin-top: 0;
  }
`;

const Title = styled.h2`
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  color: #ffffff;
  margin: 20px 0 30px;

  @media (max-width: 768px) {
    font-size: 32px;
    margin: 15px 0 20px;
  }
`;

const BackgroundText = styled.div`
  color: #000000;
  opacity: 0.05;  
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
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    gap: 5px;
  }

  p {
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #e0e0e0;
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

const StyledLink = styled.a`
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #FFF; /* Azul padrão para links */
  text-decoration: ;
  margin-bottom: 10px;

  &:hover {
    text-decoration: underline;
    color: #81a4f1; /* Um azul mais claro no hover */
  }
`;

const AddressContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: baseline; /* Alinha pela base do texto */
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  color: #FFF;
  margin-bottom: px;
  gap: 5px;
  
  a {
    margin-left: 5px; /* Espaçamento entre o texto e o link */
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    color: #FFF;
    text-decoration: underline;

    &:hover {
      text-decoration: underline;
      color: #81a4f1; /* Um azul mais claro no hover */
    }
  }
`;


function QuemSomos() {
  return (
    <Section>
      <BackgroundText>Expert Capilar</BackgroundText>
      <Content>
        <AboutLogo />
        <Title>Quem Somos</Title>
        <AddressContainer>
          <span>Onde estamos:</span>
          <StyledLink 
            href="https://www.google.com/maps?q=Av.+Ramos+Ferreira,+1416" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            Av. Ramos Ferreira, 1416
          </StyledLink>
        </AddressContainer>
        <p>Centro, Manaus, AM</p>
        <p>Contato: (92)98615-3537</p>
        <p>Na Expert Capilar, somos mais que uma barbearia: somos uma família unida pela paixão de cuidar do 
          seu estilo.</p>
        <p>Trabalhamos com parcerias exclusivas para garantir o melhor serviço e fortalecer nossos laços com
        os clientes.</p>
      </Content>
    </Section>
  );
}

export default QuemSomos;