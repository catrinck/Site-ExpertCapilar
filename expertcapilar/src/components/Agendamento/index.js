import styled from 'styled-components';
import React, { useState } from 'react';
import ModalCalendar from './modalCalendar';
import ModalAgendamento from './modalAgendamento';
import { horarios } from './horarios';
import { profissionais } from '../Pesquisa/dadosProfissionais';
import Button from './button';

const Section = styled.section`
  padding: 50px 20px;
  min-height: 100vh;
  background: #121212;
  color: #ffffff;

  @media (max-width: 768px) {
    padding: 20px;
    min-height: auto; 
  }
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
    color: #ffffff;
  }

  button {
    font-size: 2rem;
    background: none;
    border: none;
    cursor: pointer;
    color: #ffffff;
    margin-bottom: 10px;

    &:hover {
      color: #007bff;
    }
  }

  h2 {
    margin-top: 5px;
  }

  @media (max-width: 768px) {
    margin-bottom: 0px;
    width: 100%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;

function Agendamentos({data}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [modalData, setModalData] = useState(null);

  const handleHorarioClick = (horario, profissional) => {
    const horarioInicio = horario.split(' - ')[0];
    const formattedDate = selectedDate.toISOString().split('T')[0];
    const data = {
      profissional,
      horario: horarioInicio,
      data: formattedDate,
    };

    setModalData(data);
    setModalOpen(true);
  };

  const handleConfirm = async (nome, telefone) => {
    try {
      const response = await fetch("https://expert-capilar-backend.onrender.com/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_nome: nome,
          cliente_telefone: telefone,
          data_agendamento: modalData.data,
          hora_agendamento: modalData.horario,
          profissional: modalData.profissional,
        }),
      });

      if (response.ok) {
        const responseData = await response.json();
        alert("Agendamento criado com sucesso!");
      } else {
        const errorText = await response.text();
        alert("Erro ao criar agendamento. Tente novamente.");
      }
    } catch (error) {
      alert("Erro na comunicação com o servidor.");
    }
  };

  return (
    <Section id="agendamentos">
      <CalendarContainer>
        <button onClick={() => setCalendarOpen(true)}>
          <span role="img" aria-label="calendar"><Button /></span>
        </button>
        <h2>Data Selecionada: {selectedDate.toLocaleDateString()}</h2>
      </CalendarContainer>
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