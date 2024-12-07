import styled from 'styled-components';
import React, { useState } from 'react';
import ModalCalendar from './modalCalendar';

const Section = styled.section`
  padding: 40px 20px;
  background: #121212;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 180px;

  @media (max-width: 768px) {
    padding: 30px 15px;
    min-height: 150px;
  }
`;

const ScheduleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px 24px;
  gap: 8px;
  min-width: 201px;
  height: 48px;
  border: none;
  background: #FF342B;
  border-radius: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;

  .label {
    font-size: 17px;
    color: #fff;
    letter-spacing: 1px;
    line-height: 22px;
  }

  .svg-icon {
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #e52e26;
    transform: scale(1.05);

    .svg-icon {
      animation: rotate 1s linear infinite;
    }
  }

  &:active {
    transform: scale(0.95);
  }

  @keyframes rotate {
    0% { transform: rotate(0deg); }
    50% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }

  @media (max-width: 768px) {
    min-width: 180px;
    height: 44px;
    padding: 10px 20px;
  }
`;

function Agendamentos({data}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Section id="agendamentos">
      <ScheduleButton onClick={() => setCalendarOpen(true)}>
        <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" height={24} fill="none" className="svg-icon">
          <g strokeWidth={2} strokeLinecap="round" stroke="#fff">
            <rect y={5} x={4} width={16} rx={2} height={16} />
            <path d="m8 3v4" />
            <path d="m16 3v4" />
            <path d="m4 11h16" />
          </g>
        </svg>
        <span className="label">Agendar</span>
      </ScheduleButton>
      <ModalCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </Section>
  );
}

export default Agendamentos;