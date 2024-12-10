import React from 'react';
import styled from 'styled-components';
import InputMask from "react-input-mask"; 
import { useState } from "react";
import Notification from '../Notification/index';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #000000CC;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isOpen ? 1 : 0)};
  visibility: ${(props) => (props.isOpen ? 'visible' : 'hidden')};
  transition: opacity 0.4s ease, visibility 0.4s ease;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #1E1E1E;
  color: #FFFFFF;
  padding: 30px;
  font-family: 'Poppins';
  border-radius: 12px;
  width: 400px;
  text-align: center;
  transform: ${(props) => (props.isOpen ? 'scale(1)' : 'scale(0.9)')};
  transition: transform 0.4s ease, opacity 0.4s ease;
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.2);
  z-index: 1001;

  @media (max-width: 768px) {
  width: 80%; /* Ajusta o tamanho em telas menores */
  padding: 20px; /* Reduz o padding */
}

  @media (max-width: 480px) {
    width: 80%; /* Ajusta mais ainda para telas muito pequenas */
    padding: 15px;
  }
`;

const Input = styled.input`
  background: #2D2D2D;
  color: #FFFFFF;
  border: 1px solid #404040;
  margin: 10px 0;
  padding: 10px;
  width: 90%;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

 &:focus {
    outline: none;
    border-color: #0066CC;
    box-shadow: 0 0 5px #0066CC;
  }
`;

const MaskedInput = styled(InputMask)`
  background: #2d2d2d;
  color: #ffffff;
  border: 1px solid #404040;
  margin: 10px 0;
  padding: 10px;
  width: 90%;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    outline: none;
    border-color: #0066cc;
    box-shadow: 0 0 5px #0066cc;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  padding: 12px 24px;
  background-color: #FF342B;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #E52E26 ;
    transform: scale(1.05);
  }

  &:active {
    background-color: #FF342B ;
    transform: scale(0.95);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: #FF342B ;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;


function ModalAgendamento({ isOpen, onClose, onConfirm, data }) {
  const [nome, setNome] = React.useState('');
  const [telefone, setTelefone] = React.useState('');
  const [shouldRender, setShouldRender] = React.useState(isOpen);
  const [notification, setNotification] = React.useState(null); // Estado para a notificação
  const [isNotificationVisible, setIsNotificationVisible] = React.useState(false); // Controla a visibilidade da notificação

  // Reseta os campos quando o modal for aberto
  React.useEffect(() => {
    if (isOpen) {
      setNome(''); // Zera o nome
      setTelefone(''); // Zera o telefone
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), 80); // Espera a animação acabar
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  React.useEffect(() => {
    if (notification) {
      setIsNotificationVisible(true); // Exibe a notificação
      const timer = setTimeout(() => {
        setIsNotificationVisible(false); // Oculta a notificação
        setNotification(null); // Reseta o estado após a animação
      }, 3000); // 3 segundos de exibição

      return () => clearTimeout(timer); // Limpa o timer ao desmontar
    }
  }, [notification]);

  const handleConfirm = () => {
    const telefoneSemMascara = telefone.replace(/\D/g, '');
    
    // Validações
    if (telefoneSemMascara.length !== 11) {
      setNotification({
        message: 'Por favor, preencha o número completo no formato (DD) 12345-6789',
        type: 'error', // Define como erro
      });
      return; // Não envia os dados
    }

    if (!nome.trim()) {
      setNotification({
        message: 'Por favor, preencha o nome.',
        type: 'error', // Define como erro
      });
      return; // Não envia os dados
    }

    // Se tudo estiver OK
    onConfirm(nome, telefone); // Chama a função de confirmação
    setNotification({
      message: 'Agendamento criado com sucesso!',
      type: 'success', // Define como sucesso
    });

    setTimeout(() => {
      onClose();
    }, 500); // Tempo curto para sincronizar com a notificação

    

    
  };

  return (
    <>
      {isNotificationVisible && notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setIsNotificationVisible(false)}
        />
      )}

      {shouldRender && (
        <ModalContainer isOpen={isOpen} onClick={onClose}>
          <ModalContent isOpen={isOpen} onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={onClose}>&times;</CloseButton>
            <h2>Agendar com {data?.profissional}</h2>
            <p>Data: {data?.data}</p>
            <p>Horário: {data?.horario}</p>
            <Input
              type="text"
              placeholder="Seu nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <MaskedInput
              mask="(99) 99999-9999"
              placeholder="Seu telefone"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <Button onClick={handleConfirm}>Confirmar</Button>
          </ModalContent>
        </ModalContainer>
      )}
    </>
  );
}

export default ModalAgendamento;