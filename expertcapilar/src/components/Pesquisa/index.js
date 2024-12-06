import styled from 'styled-components';
import { useState } from 'react';
import { profissionais } from './dadosProfissionais';
import { horarios } from '../Agendamento/horarios';
export { Pesquisa };


const TituloContainer = styled.div`
  background-color: #121212;
  padding: 30px 0;
  width: 100%;
`;

const Titulo = styled.h2`
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const ProfissionaisContainer = styled.div`
  background: #121212;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CardWrapper = styled.div`
  perspective: 1000px; /* Necessário para rotação 3D */

  @media (max-width: 768px) {
    position: relative;
  }
`;

const ProfissionalCard = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  cursor: pointer;
`;


const CardFront = styled.div`
  background: #2D2D2D;
  color: #FFFFFF;;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardBack = styled.div`
  background: #1E1E1E;
  color: #FFFFFF;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start; /* Ajusta para alinhar os itens ao topo */
  text-align: center;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Nome = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px; /* Reduz a distância abaixo do título no card virado */
  }
`;


const Foto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Foto redonda */
  object-fit: cover;
  margin-bottom: 10px;

  @media (max-width: 768px){
  width: 150px;
  height: 150px;
`;


const Info = styled.p`
  color: #B3B3B3;
  font-size: 14px;
  margin: 5px 0;
`;


const HorarioCard = styled.div`
  background: #2D2D2D;
  color: #FFFFFF;
  border: 1px solid #404040;
  padding: 13px;
  margin: 5px;
  border-radius: 6px;
  
  &:hover {
    background: #404040;
  }
`;

const Seta = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #FFFFFF;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

function Pesquisa() {
  const [flippedCards, setFlippedCards] = useState({});
  
  const toggleCardFlip = (index) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <div>
      <TituloContainer>
        <Titulo>Conheça nossos profissionais</Titulo>
      </TituloContainer>
      <ProfissionaisContainer>
        {profissionais.map((profissional, index) => (
          <CardWrapper key={index}>
            <ProfissionalCard flipped={flippedCards[index]}>
              <CardFront>
                <Foto src={profissional.foto} alt={profissional.nome} />
                <Nome>{profissional.nome}</Nome>
                <Info>{profissional.info1}</Info>
                <Info>{profissional.info2}</Info>
                <Seta
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(index);
                  }}
                >
                  ⮞
                </Seta>
              </CardFront>
              <CardBack>
                <Nome>Horários Disponíveis</Nome>
                {horarios.map((horario, i) => (
                  <HorarioCard key={i}>{horario}</HorarioCard>
                ))}
                <Seta
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(index);
                  }}
                >
                  ⮜
                </Seta>
              </CardBack>
            </ProfissionalCard>
          </CardWrapper>
        ))}
      </ProfissionaisContainer>
    </div>
  );
}