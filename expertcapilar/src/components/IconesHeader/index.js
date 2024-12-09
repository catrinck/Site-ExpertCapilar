import whatsapp from '../../assets/whatsapp.svg'
import instagram from '../../assets/instagram.svg'
import styled from 'styled-components'


const IconeContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-left: -230px; /* Move 15px pra esquerda */
  align-items: center; /* Centraliza os ícones com o texto */
  gap: 10px;
`;

const IconeTexto = styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  margin-left: -237px; /* Move 15px pra esquerda */
  color: white;
  margin-bottom: 0; /* Remove a margem inferior */
  text-align: center; /* Centraliza o texto */
`;

const Icone = styled.img`
  width: 30px;
`;

const IconesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 5px; /* Espaçamento entre texto e ícones */
`;

function IconesHeader() {
  return (
    <IconesWrapper>
      <IconeTexto>Entre em contato</IconeTexto>
      <IconeContainer>
        <a
          href="https://wa.me/92986153537?text=Olá, gostaria de saber mais informações!"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icone src={whatsapp} alt="WhatsApp" />
        </a>
        <a
          href="https://www.instagram.com/barbeariaexpertcapilar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icone src={instagram} alt="Instagram" />
        </a>
      </IconeContainer>
    </IconesWrapper>
  );
}

export default IconesHeader;