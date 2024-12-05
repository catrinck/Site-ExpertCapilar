import styled from 'styled-components';
import { useState } from 'react';
import { profissionais } from './dadosProfissionais';
import { horarios } from '../Agendamento/horarios';
export { Pesquisa };


const Titulo = styled.h2`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  text-align: center;
  width: 100%;

  @media (max-width: 768px) {
    margin-top: -560px;
    font-size: 30px;
  }
`;

const ProfissionaisContainer = styled.div`
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

  @media (max-width: 768px) {
    transform-style: preserve-3d;
    transition: transform 0.6s;
    transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
    cursor: pointer; /* Indica que o card é clicável */
  }
`;

const CardFront = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardBack = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  background: #f9f9f9;
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
  font-size: 14px;
  color: #555;
  margin: 5px 0;

  @media (max-width: 768px){
  font-size: 20px;
}
`;


/* HorarioCard e Seta apenas para a versao mobile */
const HorarioCard = styled.div`
  @media (max-width: 768px) {
    font-size: 18px;
    padding: 10px 15px;
    background: #f0f8ff;
    border: 1px solid #007bff;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    margin: 5px;

    &:hover {
      background: #d0e7ff;
      border-color: #0056b3;
    }
`;

const Seta = styled.div`
  @media (max-width: 768px) {
    position: absolute;
    bottom: 10px;
    right: 10px;
    font-size: 24px; /* Aumenta o tamanho da seta */
    width: 50px; /* Largura da área clicável */
    height: 50px; /* Altura da área clicável */
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.1); /* Fundo sutil para destacar */
    border-radius: 50%; /* Formato circular */
    cursor: pointer; /* Indica interatividade */
    user-select: none; /* Impede seleção do texto da seta */
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
        <Titulo>Conheça nossos profissionais</Titulo>
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