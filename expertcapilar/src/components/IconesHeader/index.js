import whatsapp from '../../assets/whatsapp.svg'
import styled from 'styled-components'


/* ICONE DO WHATSAPP */
const IconeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-right: 40px;
`;

const IconeTexto = styled.p`
  font-size: 18px;
  font-family: 'Poppins', sans-serif;
  color: white;
  margin: 0 0 5px; 
  text-align: center;
`;

const Icone = styled.img`
  width: 30px;
`;

const Icones = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function IconesHeader() {
  return (
    <Icones>
      <IconeContainer>
        <IconeTexto>Entre em contato</IconeTexto>
        <a
                    href="https://wa.me/92988464951?text=Olá, gostaria de mais informações!"
                    target="_blank"
                    rel="noopener noreferrer"
                >
        <Icone src={whatsapp} alt="WhatsApp" />
                </a>
      </IconeContainer>
    </Icones>
  );
}

export default IconesHeader;