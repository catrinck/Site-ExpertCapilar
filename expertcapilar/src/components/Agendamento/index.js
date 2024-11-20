import styled from 'styled-components';
import { horarios } from './horarios';
import { profissionais } from '../Pesquisa/dadosProfissionais';
import ModalAgendamento from './modalAgendamento';
import React, { useState } from 'react';


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
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log('Data selecionada:', newDate); // Use essa data para buscar horários disponíveis
  };

  const handleHorarioClick = (horario, profissional) => {
    setModalData({ profissional, horario, data: '2024-11-21' });
    setModalOpen(true); // Certifique-se de que está setando true
  };

  const handleConfirm = async (nome, telefone) => {
    // Envia os dados ao backend
    const response = await fetch('http://localhost:8000/agendamentos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        cliente_nome: nome,
        cliente_telefone: telefone,
        data_agendamento: modalData.data,
        hora_agendamento: modalData.horario,
        profissional: modalData.profissional,
      }),
    });

    if (response.ok) {
      alert('Agendamento criado com sucesso!');
    } else {
      alert('Erro ao criar agendamento.');
    }

    setModalOpen(false);
  };

  return (
    <Section id="agendamentos">
      <Titulo>Horários Disponíveis</Titulo>
      <GradeHorarios>
        {profissionais.map((profissional, index) => (
          <ColunaHorarios key={index}>
            <h3>{profissional.nome}</h3>
            {horarios.map((horario, index) => (
              <Horario
                key={index}
                onClick={() => handleHorarioClick(horario, profissional.nome)}
              >
                {horario}
              </Horario>
            ))}
          </ColunaHorarios>
        ))}
      </GradeHorarios>
      <ModalAgendamento
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirm}
        data={modalData}
      />
    </Section>
  );
}

export default Agendamentos;