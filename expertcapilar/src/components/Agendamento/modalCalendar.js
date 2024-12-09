import React, { useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

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
    max-width: 82%;
    border-radius: 15px 15px 0 0;
    padding: 20px 15px;
    max-height: 55vh;
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
const ModalCalendar = ({ isOpen, onClose, selectedDate, setSelectedDate }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';

      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.width = '';
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>Selecione uma Data</h2>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          minDate={new Date()}
          dayClassName={(date) => {
            const isOutsideMonth = date.getMonth() !== selectedDate.getMonth();
            return isOutsideMonth ? 'outside-month' : '';
          }}
        />
        <ButtonContainer>
          <Button onClick={onClose}>Cancelar</Button>
          <Button primary onClick={handleConfirm}>Confirmar</Button>
        </ButtonContainer>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCalendar;