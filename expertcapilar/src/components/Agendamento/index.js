import styled from 'styled-components';
import { horarios } from './horarios';
import { profissionais } from '../Pesquisa/dadosProfissionais';

const Section = styled.section`
  padding: 50px 20px;
  min-height: 100vh;
  background: #fff;
`;

const Titulo = styled.h2`
  color: #000;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  text-align: center;
  margin-bottom: 30px;
`;

const GradeHorarios = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Alinha com os barbeiros */
  gap: 20px;
`;

const ColunaHorarios = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Horario = styled.div`
  padding: 15px;
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  font-size: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);

  &:hover {
    background: #e0f7fa;
    cursor: pointer;
  }
`;

function Agendamentos() {

     return (
          <Section id="agendamentos">
            <Titulo>Horários Disponíveis</Titulo>
            <GradeHorarios>
              {profissionais.map((profissional, index) => (
                <ColunaHorarios key={index}>
                  {horarios.map((horario, index) => (
                    <Horario key={index}>{horario}</Horario>
                  ))}
                </ColunaHorarios>
              ))}
            </GradeHorarios>
          </Section>
        );
      }
   
export default Agendamentos;