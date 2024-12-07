import ModalAgendamento from '../Agendamento/modalAgendamento';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import Notification from '../Notification/index'; 
import { profissionais } from './dadosProfissionais';
import { horarios } from '../Agendamento/horarios';
export { Pesquisa };

const TituloContainer = styled.div`
  background-color: #121212;
  padding: 30px 0;
  width: 100%;
`;

const Titulo = styled.h2`
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  font-size: 36px;
  text-align: center;
  width: 100%;
`;

const ProfissionaisContainer = styled.div`
  background: #121212;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const CardWrapper = styled.div`
  perspective: 1000px; /* Necessário para rotação 3D */

  @media (max-width: 768px) {
    position: relative;
  }
`;

const ProfissionalCard = styled.div`
  position: relative;
  width: 100%;
  height: 600px;
  transform-style: preserve-3d;
  transition: transform 0.6s;
  transform: ${({ flipped }) => (flipped ? 'rotateY(180deg)' : 'rotateY(0)')};
  cursor: pointer;
`;


const CardFront = styled.div`
  background: #2D2D2D;
  color: #FFFFFF;;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const CardBack = styled.div`
  background: #1E1E1E;
  color: #FFFFFF;
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transform: rotateY(180deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px;
  overflow-y: auto; /* Adiciona scroll interno */
  max-height: 100%; /* Restringe o tamanho do card */
  box-sizing: border-box; /* Garante que padding não afete o tamanho */

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Nome = styled.h3`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 25px;
    font-weight: bold;
    margin-bottom: 15px; /* Reduz a distância abaixo do título no card virado */
  }
`;


const Foto = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%; /* Foto redonda */
  object-fit: cover;
  margin-bottom: 10px;

  @media (max-width: 768px){
  width: 150px;
  height: 150px;
`;


const Info = styled.p`
  color: #B3B3B3;
  font-size: 14px;
  margin: 5px 0;
`;


const HorarioCard = styled.div`
  background: #2D2D2D;
  color: #FFFFFF;
  border: 1px solid #404040;
  padding: 13px;
  margin: 5px;
  border-radius: 6px;
  
  &:hover {
    background: #404040;
  }
`;

const Seta = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  font-size: 24px;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  color: #FFFFFF;
  cursor: pointer;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const HorariosContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* Define duas colunas fixas */
  gap: 10px; /* Espaçamento entre os horários */
  width: 100%; /* Garante que ocupa a largura disponível */
  margin-top: 20px; /* Espaçamento abaixo do título */
`;

function Pesquisa() {
  const [flippedCards, setFlippedCards] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [confirmados, setConfirmados] = useState([]); // Estado para armazenar agendamentos confirmados
  const [notification, setNotification] = useState(null);


  // Buscar agendamentos confirmados no banco
  useEffect(() => {
    const fetchConfirmados = async () => {
      try {
        const dataAtual = new Date().toISOString().split("T")[0];
        const profissionaisNomes = profissionais.map((prof) => prof.nome); // Pega os nomes dos profissionais
        let horariosConfirmados = {}; // Objeto para armazenar os horários confirmados por profissional
  
        for (const profissional of profissionaisNomes) {
          const response = await fetch(
            `https://expert-capilar-backend.onrender.com/agendamentos/disponibilidade?data_agendamento=${dataAtual}&profissional=${profissional}`
          );
          const data = await response.json();
  
          console.log(`Resposta da API para ${profissional}:`, data);
  
          if (data && Array.isArray(data.horariosDisponiveis)) {
            horariosConfirmados[profissional] = data.horariosDisponiveis;
          } else {
            console.error(`Erro para ${profissional}: Dados inválidos`, data);
            horariosConfirmados[profissional] = []; // Evita quebra
          }
        }
  
        setConfirmados(horariosConfirmados); // Atualiza o estado com os horários por profissional
      } catch (error) {
        console.error("Erro ao buscar horários disponíveis:", error);
        setConfirmados({}); // Garante que seja um objeto vazio em caso de erro
      }
    };
  
    fetchConfirmados();
  }, []);
  

  const toggleCardFlip = (index) => {
    setFlippedCards((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const openModal = (profissional, horario) => {
    const horarioFormatado = horario.split(" - ")[0];
    const formattedDate = new Date().toISOString().split("T")[0]; // Data atual formatada

    setModalData({
      profissional: profissional.nome,
      horario: horarioFormatado,
      data: formattedDate,
    });

    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleConfirm = async (nome, telefone) => {
    console.log("Tentando criar agendamento com:", {
      cliente_nome: nome,
      cliente_telefone: telefone,
      data_agendamento: modalData.data,
      hora_agendamento: modalData.horario,
      profissional: modalData.profissional,
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
          data_agendamento: modalData.data,
          hora_agendamento: modalData.horario,
          profissional: modalData.profissional,
        }),
      });

      if (response.ok) {
        setNotification("Agendamento criado com sucesso!"); // Substitui o alert
      } else {
        const errorText = await response.text();
        setNotification(`Erro ao criar agendamento: ${errorText}`);
      }
    } catch (error) {
      setNotification("Erro na comunicação com o servidor. Tente novamente mais tarde.");
    }

    closeModal();
  };

  // Verificar se um horário está confirmado
  const isHorarioConfirmado = (horario, profissional) => {
    if (!confirmados[profissional] || !Array.isArray(confirmados[profissional])) {
      console.error(`Horários não carregados para ${profissional}:`, confirmados[profissional]);
      return false; // Evita erros
    }
  
    console.log(`Checando se ${horario} está disponível para ${profissional}:`, confirmados[profissional]);
  
    return !confirmados[profissional].includes(horario); // Verifica o horário completo
  };

  return (
    <div>
      <TituloContainer>
        <Titulo>Conheça nossos profissionais</Titulo>
      </TituloContainer>
      <ProfissionaisContainer>
        {profissionais.map((profissional, index) => (
          <CardWrapper key={index}>
            <ProfissionalCard flipped={flippedCards[index]}>
              <CardFront>
                <Foto src={profissional.foto} alt={profissional.nome} />
                <Nome>{profissional.nome}</Nome>
                <Info>{profissional.info1}</Info>
                <Info>{profissional.info2}</Info>
                <Seta
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(index);
                  }}
                >
                  ⮞
                </Seta>
              </CardFront>
              <CardBack>
                <Nome>Horários Disponíveis Hoje</Nome>
                <HorariosContainer>
                  {horarios.map((horario, i) => {
                    const horarioDesabilitado = isHorarioConfirmado(horario, profissional.nome);

                    return (
                      <HorarioCard
                        key={i}
                        onClick={
                          !horarioDesabilitado
                            ? () => openModal(profissional, horario)
                            : null
                        }
                        style={{
                          cursor: horarioDesabilitado ? "not-allowed" : "pointer",
                          opacity: horarioDesabilitado ? 0.5 : 1,
                        }}
                        title={
                          horarioDesabilitado
                            ? "Este horário já está confirmado."
                            : "Clique para agendar"
                        }
                      >
                        {horario}
                      </HorarioCard>
                    );
                  })}
                </HorariosContainer>
                <Seta
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCardFlip(index);
                  }}
                >
                  ⮜
                </Seta>
              </CardBack>
            </ProfissionalCard>
          </CardWrapper>
        ))}
      </ProfissionaisContainer>

      {/* Modal de Agendamento */}
      <ModalAgendamento
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        data={modalData}
      />
    </div>
  );
}