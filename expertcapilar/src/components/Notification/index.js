import React, { useEffect, useState } from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: fixed;
  top: ${(props) => (props.type === "error" ? "15%" : "20px")}; /* Mais próximo no caso de erro */
  left: 50%;
  transform: translateX(-50%); /* Centraliza horizontalmente */
  background: ${(props) => (props.type === "error" ? "#dc3545" : "#28a745")}; /* Vermelho para erro, verde para sucesso */
  color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  z-index: 1100; /* Certifique-se de que fique acima do modal */
  animation: fade-in 0.3s ease, fade-out 0.3s ease 3s;

  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
    to {
      opacity: 1;
      transform: translate(-50%, 0);
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translate(-50%, 0);
    }
    to {
      opacity: 0;
      transform: translate(-50%, -10px);
    }
  }
`;

function Notification({ message, type, onClose }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Controla o fade-out e a remoção do componente
    const fadeOutTimer = setTimeout(() => setVisible(false), 2700); // Inicia o fade-out antes de remover
    const removeTimer = setTimeout(onClose, 3000); // Remove após o fade-out

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, [onClose]);

  if (!visible) {
    return null; // Garante que o componente seja desmontado após o fade-out
  }

  return <NotificationContainer type={type}>{message}</NotificationContainer>;
}

export default Notification;