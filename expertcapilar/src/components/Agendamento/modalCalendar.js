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
import Notification from '../Notification/index';

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
  const [step, setStep] = useState(1); 
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedBarbeiro, setSelectedBarbeiro] = useState(null);
  const [selectedHorario, setSelectedHorario] = useState(null);
  const [isModalAgendamentoOpen, setIsModalAgendamentoOpen] = useState(false);
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isNotificationVisible, setIsNotificationVisible] = useState(false);
  const [horariosDoDia, setHorariosDoDia] = useState([
    "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", 
    "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", 
    "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", 
    "18:00", "18:30", "19:00"
  ]);

  const resetStates = () => {
    setStep(1);
    setSelectedDate(null);
    setSelectedBarbeiro(null);
    setSelectedHorario(null);
    setHorariosDisponiveis([]);
    setIsModalAgendamentoOpen(false);
  };

  useEffect(() => {
    if (notification) {
      setIsNotificationVisible(true);
      const timer = setTimeout(() => {
        setIsNotificationVisible(false);
        setNotification(null);

      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // Função para buscar horários disponíveis no backend
  const fetchHorariosDisponiveis = async () => {
    if (!selectedBarbeiro || !selectedDate) return;
  
    try {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      const response = await fetch(
        `https://expert-capilar-backend.onrender.com/agendamentos/disponibilidade?data_agendamento=${formattedDate}&profissional=${selectedBarbeiro}`
      );
  
      if (response.ok) {
        const data = await response.json();
  
        // Monta a lista de horários marcando como disabled os que não estão disponíveis
        const horariosAtualizados = horariosDoDia.map((horario) => ({
          time: horario,
          disabled: !data.horariosDisponiveis.includes(horario),
        }));
        setHorariosDisponiveis(horariosAtualizados);
      } else {
        const errorText = await response.text();
        setNotification({ message: `Erro ao buscar horários: ${errorText}`, type: 'error' });
      }
    } catch (error) {
      console.error('Erro ao buscar horários:', error);
      setNotification({ message: 'Erro de conexão com o servidor.', type: 'error' });
    }
  };

  useEffect(() => {
    if (step === 3) {
      fetchHorariosDisponiveis();
    }
  }, [step]);


  const handleNextStep = () => setStep(step + 1);
  const handlePreviousStep = () => setStep(step - 1);

  const handleConfirmAgendamento = async (nome, telefone) => {
    const formattedDate = selectedDate.toISOString().split('T')[0];

    console.log("Tentando criar agendamento com:", {
      cliente_nome: nome,
      cliente_telefone: telefone,
      data_agendamento: formattedDate,
      hora_agendamento: selectedHorario,
      profissional: selectedBarbeiro,
    });

    try {
      const response = await fetch("https://expert-capilar-backend.onrender.com/agendamentos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cliente_nome: nome,
          cliente_telefone: telefone,
          data_agendamento: formattedDate,
          hora_agendamento: selectedHorario,
          profissional: selectedBarbeiro,
        }),
      });

      if (response.ok) {
        setNotification({ message: "Agendamento criado com sucesso!", type: "success" });
        setTimeout(() => {
            setNotification(null);
            resetStates(); // Reseta os estados do componente
            setIsModalAgendamentoOpen(false); // Fecha o modal de agendamento
            onClose(); // Fecha o modal principal
        }, 2000); // Tempo para a notificação desaparecer
    } else {
        const errorText = await response.text();
        setNotification({ message: `Erro ao criar agendamento: ${errorText}`, type: "error" });
    }
} catch (error) {
    console.error("Erro ao criar agendamento:", error);
    setNotification({ message: "Erro na comunicação com o servidor. Tente novamente mais tarde.", type: "error" });
}
};

  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        {/* Exibe a notificação se existir */}
        {notification && (
          <Notification message={notification.message} type={notification.type} />
        )}

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
            <h2>Horários Disponíveis </h2>
            <p style={{ color: '#AAAAAA', marginBottom: '20px' }}>
              Data selecionada: {selectedDate ? selectedDate.toLocaleDateString() : ''}
            </p>
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
              {horariosDisponiveis.map(({ time, disabled }) => (
                <button
                  key={time}
                  onClick={!disabled ? () => setSelectedHorario(time) : null}
                  className={selectedHorario === time ? 'selected' : ''}
                  style={{
                    padding: '10px 15px',
                    fontSize: '16px',
                    color: disabled ? '#666' : selectedHorario === time ? 'white' : '#FFFFFF',
                    background: disabled
                      ? '#404040'
                      : selectedHorario === time
                      ? '#FF342B'
                      : '#2D2D2D',
                    border: '1px solid #404040',
                    borderRadius: '8px',
                    cursor: disabled ? 'not-allowed' : 'pointer',
                    transition: 'background 0.3s, transform 0.2s',
                    opacity: disabled ? 0.6 : 1,
                  }}
                  disabled={disabled}
                >
                  {time}
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
              setIsModalAgendamentoOpen(false);
              onClose(true);
              resetStates();
            }}
            onConfirm={(nome, telefone) => handleConfirmAgendamento(nome, telefone)}
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