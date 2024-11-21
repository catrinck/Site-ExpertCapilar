import styled from 'styled-components';
import React, { useState } from 'react';
import ModalCalendar from './modalCalendar';
import ModalAgendamento from './modalAgendamento';
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

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;

  h2 {
    font-size: 1rem;
    font-weight: normal;
    margin-top: 10px;
    color: #333;
  }

  button {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #333;
    margin-bottom: 10px;

    &:hover {
      color: #007bff;
    }
  }
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
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalData, setModalData] = useState(null);

  // Função para abrir o modal de agendamento
  const handleHorarioClick = (horario, profissional) => {
    setModalData({ profissional, horario, data: selectedDate.toLocaleDateString() });
    setModalOpen(true);
  };

  // Função para confirmar o agendamento
  const handleConfirm = async (nome, telefone) => {
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
      <CalendarContainer>
        <button onClick={() => setCalendarOpen(true)}>
          <span role="img" aria-label="calendar">📅</span>
        </button>
        <h2>Data Selecionada: {selectedDate.toLocaleDateString()}</h2>
      </CalendarContainer>
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
      <ModalCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
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
