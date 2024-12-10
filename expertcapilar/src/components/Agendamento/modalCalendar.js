import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { horarios } from './horarios';
import DG from '../../assets/DG/DG.JPG'
import yohann from '../../assets/DoCarmo/yohann.jpg'
import Henry from '../../assets/Henry/Henry.JPG'
import Silvio from '../../assets/Silvio/silvio.jpg'
import ModalAgendamento from './modalAgendamento';

const barbeiros = [
  { nome: 'Silvio', especialidade: 'Cabelos Curly', experiencia: '10 anos', foto: Silvio},
  { nome: 'DG', especialidade: 'Barba', experiencia: '3 anos', foto: DG },
  { nome: 'Yohann do Carmo', especialidade: 'Cortes Modernos', experiencia: '4 anos', foto: yohann },
  { nome: 'Henry André', especialidade: 'Degradê', experiencia: '6 anos', foto: Henry}
];

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden; 
  
  @media (max-width: 768px) {
    align-items: center;
    width: 100%;
  }
`;

const ModalContent = styled.div`
  background: #1E1E1E;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  max-width: 400px;
  width: 90%;
  text-align: center;
  overflow-y: auto;
  max-height: 90vh;

  @media (max-width: 768px) {
    width: 95%;
    max-width: 87%;
    border-radius: 15px 15px 0 0;
    padding: 20px 15px;
    max-height: 60vh;
  }

  h2 {
    color: #FFFFFF;
    font-family: 'Poppins', sans-serif;
    margin-bottom: 20px;
    font-size: 24px;

    @media (max-width: 768px) {
      font-size: 20px;
      margin-bottom: 15px;
    }
  }

  .react-datepicker {
    background: #2D2D2D;
    border: none;
    border-radius: 12px;
    font-family: 'Poppins', sans-serif;
    padding: 15px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);

    @media (max-width: 768px) {
      padding: 10px;
      width: 90%;
    }
  }

  .react-datepicker__month-container {
    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .react-datepicker__header {
    background: #2D2D2D;
    border-bottom: 1px solid #404040;
    padding: 0px;
    border-top-left-radius: 12px;
    border-top-right-radius: 12px;
  }

  .react-datepicker__current-month {
    color: #FFFFFF;
    font-size: 18px;
    font-weight: 600;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }

  .react-datepicker__day-name {
    color: #888;
    margin: 8px;
    width: 36px;
    font-weight: 500;

    @media (max-width: 768px) {
      width: 32px;
      margin: 6px;
      font-size: 14px;
    }
  }

  .react-datepicker__day {
    color: #FFFFFF;
    margin: 8px;
    width: 36px;
    height: 36px;
    line-height: 36px;
    border-radius: 50%;
    transition: all 0.2s ease;

    @media (max-width: 768px) {
      width: 32px;
      height: 32px;
      line-height: 32px;
      margin: 6px;
      font-size: 14px;
    }

    &:hover {
      background: #FF342B;
      color: white;
    }
  }

  .react-datepicker__day--selected {
    background: #FF342B;
    color: white;
    font-weight: bold;
  }

  .react-datepicker__day--disabled {
    color: #666;
    &:hover {
      background: transparent;
    }
  }

  .react-datepicker__navigation {
    top: 15px;

    &--previous {
      left: 15px;
    }

    &--next {
      right: 15px;
    }
  }

  .react-datepicker__day--outside-month {
    color: #666;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 25px;

  @media (max-width: 768px) {
    gap: 14px;
    margin-top: 20px;
  }
`;

const Button = styled.button`
  padding: 12px 30px;
  background: ${props => props.primary ? '#FF342B' : '#2D2D2D'};
  color: white;
  border: none;
  border-radius: 25px;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  -webkit-tap-highlight-color: transparent;

  @media (max-width: 768px) {
    padding: 12px 25px;
    font-size: 15px;
    width: 45%;
  }

  &:hover {
    transform: scale(1.05);
    background: ${props => props.primary ? '#E52E26' : '#404040'};
  }

  &:active {
    transform: scale(0.95);
  }
`;


const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: none;
  text-align: center;
  background: transparent;
`;
const ModalFlow = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1); // Controla os passos: 1 = Data, 2 = Barbeiro, 3 = Horário
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false);

  const resetStates = () => {
    setStep(1); // Volta para o primeiro passo
    setSelectedDate(null);
    setSelectedBarbeiro(null);
    setSelectedHorario(null);
    setIsModalAgendamentoOpen(false); // Fecha o modal de agendamento
  };


  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => (document.body.style.overflow = '');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleConfirm = () => {
    console.log('Data:', selectedDate);
    console.log('Barbeiro:', selectedBarbeiro);
    console.log('Horário:', selectedHorario);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        {step === 1 && (
          <>
            <h2>Selecione uma Data</h2>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              inline
              minDate={new Date()}
            />
            <ButtonContainer>
              <Button onClick={onClose}>Cancelar</Button>
              <Button primary onClick={handleNextStep} disabled={!selectedDate}>
                Confirmar
              </Button>
            </ButtonContainer>
          </>
        )}

{step === 2 && (
      <>
        {/* Conteúdo do Pop-up de Barbeiros */}
        <h2>Escolha seu Barbeiro</h2>
        <div className="grid" style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {barbeiros.map((barbeiro, index) => (
            <button
              key={index}
              onClick={() => setSelectedBarbeiro(barbeiro.nome)}
              className={selectedBarbeiro === barbeiro.nome ? 'selected' : ''}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '15px',
                background: selectedBarbeiro === barbeiro.nome ? '#FF342B' : '#2D2D2D',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'background 0.3s',
              }}
            >
              <img
                src={barbeiro.foto}
                alt={barbeiro.nome}
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                }}
              />
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>{barbeiro.nome}</h3>
                <p style={{ margin: 0, fontSize: '14px', color: '#AAAAAA' }}>{barbeiro.especialidade}</p>
              </div>
            </button>
          ))}
        </div>
        <ButtonContainer>
          <Button onClick={handlePreviousStep}>Voltar</Button>
          <Button primary onClick={handleNextStep} disabled={!selectedBarbeiro}>
            Confirmar
          </Button>
        </ButtonContainer>
      </>
    )}


{step === 3 && (
  <>
    <h2>Horários Disponíveis Hoje</h2>
    <div
      className="grid"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '15px',
        justifyItems: 'center',
        alignItems: 'center',
      }}
    >
      {horarios.map((horario) => (
        <button
          key={horario}
          onClick={() => setSelectedHorario(horario)}
          className={selectedHorario === horario ? 'selected' : ''}
          style={{
            padding: '10px 15px',
            fontSize: '16px',
            color: selectedHorario === horario ? 'white' : '#FFFFFF',
            background: selectedHorario === horario ? '#FF342B' : '#2D2D2D',
            border: '1px solid #404040',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'background 0.3s, transform 0.2s',
          }}
        >
          {horario}
        </button>
      ))}
    </div>
    <ButtonContainer>
      <Button onClick={() => setStep(2)}>Voltar</Button>
      <Button
        primary
        onClick={() => {
          if (selectedHorario) {
            setIsModalAgendamentoOpen(true); // Abre o modal do step 4
            setStep(4); // Atualiza o step
          }
        }}
        disabled={!selectedHorario}
      >
        Confirmar
      </Button>
    </ButtonContainer>
  </>
)}

{step === 4 && (
  <ModalAgendamento
    isOpen={isModalAgendamentoOpen}
    onClose={() => {
      setIsModalAgendamentoOpen(false); // Fecha o modal
      resetStates();
      onClose(); // Fecha todo o fluxo, se necessário
    }}
    onConfirm={(nome, telefone) => {
      console.log('Agendamento Confirmado:', {
        nome,
        telefone,
        selectedDate,
        selectedBarbeiro,
        selectedHorario,
      });
      setIsModalAgendamentoOpen(false); // Fecha o modal após confirmação
      resetStates();
      onClose(); // Finaliza o fluxo completo
    }}
    data={{
      profissional: selectedBarbeiro,
      data: selectedDate?.toLocaleDateString(),
      horario: selectedHorario,
    }}
  />
)}


  </ModalContent>
</ModalOverlay>
  );
};

export default ModalFlow;