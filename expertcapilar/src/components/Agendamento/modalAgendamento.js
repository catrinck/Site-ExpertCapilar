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
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 90%;
  text-align: center;
  font-family: 'Arial', sans-serif;
`;

const CloseButton = styled.button`
  background: #e63946;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 15px;
  width: 100%;
  transition: background 0.3s ease;

  &:hover {
    background: #d62839;
  }
`;

const StyledDatePicker = styled(DatePicker)`
  .react-datepicker {
    border: none;
    font-family: 'Arial', sans-serif;
    font-size: 1rem;
    width: 100%;
  }

  .react-datepicker__header {
    background: transparent;
    border-bottom: 1px solid #e0e0e0;
    padding: 10px 0;
    font-size: 1.25rem;
    color: #333;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    color: #333;
    font-size: 0.9rem;
    padding: 10px;
    margin: 2px;
    border-radius: 50%;
    transition: background-color 0.2s ease, color 0.2s ease;
  }

  .react-datepicker__day:hover {
    background-color: #e63946;
    color: #fff;
  }

  .react-datepicker__day--selected {
    background-color: transparent;
    border: 2px solid #e63946;
    color: #e63946;
    font-weight: bold;
  }

  .react-datepicker__day--today {
    border: 2px solid #000;
    color: #333;
  }

  .react-datepicker__navigation {
    border: none;
    background: transparent;
    color: #333;
    font-size: 1.5rem;
    line-height: 1;
    cursor: pointer;
  }

  .react-datepicker__navigation:hover {
    color: #e63946;
  }

  .react-datepicker__navigation-icon {
    color: #333;
    font-size: 2.5rem;
  }

  .react-datepicker__month-dropdown,
  .react-datepicker__year-dropdown,
  .react-datepicker__month-dropdown-container,
  .react-datepicker__year-dropdown-container {
    display: none !important;
    visibility: hidden;
  }

  .react-datepicker__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ModalCalendar = ({ isOpen, onClose, selectedDate, setSelectedDate }) => {
  if (!isOpen) return null;

  return (
    <ModalOverlay>
      <ModalContent>
        <h2 style={{ marginBottom: '30px', fontSize: '1.5rem', color: '#333' }}>
          Selecione uma Data
        </h2>
        <StyledDatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          inline
          renderCustomHeader={({ date, decreaseMonth, increaseMonth }) => (
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0 10px',
              }}
            >
              <button
                onClick={decreaseMonth}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#333',
                }}
              >
                &#8249;
              </button>
              <span style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                {date.toLocaleString('default', { month: 'long' })}{' '}
                {date.getFullYear()}
              </span>
              <button
                onClick={increaseMonth}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '1.5rem',
                  color: '#333',
                }}
              >
                &#8250;
              </button>
            </div>
          )}
        />
        <CloseButton onClick={onClose}>Fechar</CloseButton>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ModalCalendar;
