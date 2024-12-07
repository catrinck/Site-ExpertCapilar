import React from "react";
import styled from "styled-components";

const NotificationContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #28a745; /* Verde para sucesso */
  color: #fff;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  font-family: "Poppins", sans-serif;
  font-size: 16px;
  z-index: 1000;
  animation: fade-in 0.3s ease, fade-out 0.3s ease 3s;
  
  @keyframes fade-in {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fade-out {
    from {
      opacity: 1;
      transform: translateY(0);
    }
    to {
      opacity: 0;
      transform: translateY(-10px);
    }
  }
`;

function Notification({ message, onClose }) {
  React.useEffect(() => {
    const timer = setTimeout(onClose, 3000); // Fecha o balão automaticamente após 3 segundos
    return () => clearTimeout(timer);
  }, [onClose]);

  return <NotificationContainer>{message}</NotificationContainer>;
}

export default Notification;