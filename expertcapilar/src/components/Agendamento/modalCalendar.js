import React from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }

  &:active {
    background-color: #004494;
    transform: scale(0.95);
  }
`;

const CloseButton = styled.button`
  background: #ff6b6b;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
`;


const StyledDatePicker = styled(DatePicker)`
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  text-align: center;
`;


const ModalCalendar = ({ isOpen, onClose, selectedDate, setSelectedDate }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Selecione uma Data</h2>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          minDate={new Date()} // Não permite selecionar datas passadas
          dayClassName={(date) => {
            // Adiciona uma classe CSS para dias fora do mês atual
            const isOutsideMonth = date.getMonth() !== selectedDate.getMonth();
            return isOutsideMonth ? 'outside-month' : '';
          }}
        />
        <ButtonContainer>
          <Button onClick={selectedDate}>Confirmar</Button>
          <CloseButton onClick={onClose}>Fechar</CloseButton>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCalendar;

