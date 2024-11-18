import Input from '../Input'
import styled from 'styled-components'
import { useState } from 'react'
import { useEffect } from 'react'
import { profissionais } from './dadosProfissionais'

const Titulo = styled.h2`
    color: #000;
    font-family: 'Poppins', sans-serif;
    font-size: 36px;
    text-align: center;
    width: 100%;
`
const ProfissionaisContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px; /* Espaçamento entre os cartões */
  padding: 20px;
  flex-direction: column;
`;

const ProfissionalCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 15px;
  text-align: center;
  height: 65vh; 
  margin: 0 10px; 
  transition: transform 0.2s, box-shadow 0.2s; /* Transição suave */

  &:hover {
    transform: translateY(-5px); /* Efeito de elevação ao passar o mouse */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Sombra mais intensa no hover */
  }
`;

const Foto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Foto redonda */
  object-fit: cover;
  margin-bottom: 10px;
`;

const Nome = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
`;

const Info = styled.p`
  font-size: 14px;
  color: #555;
  margin: 5px 0;
`;



function Pesquisa() {
    
    return (
        <div>

        <Titulo>
                Conheça nossos profissionais
            </Titulo>
        <ProfissionaisContainer>
          {profissionais.map((profissional, index) => (
            <ProfissionalCard key={index}>
              <Foto src={profissional.foto} alt={profissional.nome} />
              <Nome>{profissional.nome}</Nome>
              <Info>{profissional.info1}</Info>
              <Info>{profissional.info2}</Info>
            </ProfissionalCard>
          ))}
        </ProfissionaisContainer>
        </div>
      );
    }


export default Pesquisa