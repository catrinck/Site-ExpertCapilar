import React, { useState } from 'react';
import styled from 'styled-components';
import ModalCalendar from '../Agendamento/modalCalendar';

const Opcao = styled.li`
     font-size: 22px;
     font-family: 'Poppins', sans-serif;
     display: flex;
     justify-content: center;
     align-items: center;
     text-align: center;
     min-width: 120px;
     padding: 0 30px;
     cursor: pointer;
     height: 100%;
     color: white;
     transition: color 0.3s ease, background-color 0.3s ease;

     &:hover {
     color: #000; /* Muda a cor ao passar o mouse */
     background-color: white; /* Adiciona um fundo ao passar o mouse */
  }
`

const Opcoes = styled.ul`
     display: flex;
     list-style: none;
     padding: 0;
     margin: 0;
     align-items: center; /* Centraliza verticalmente as opções */
`

const LinkStyled = styled.a`
     text-decoration: none; /* Remove o sublinhado */
     color: inherit; /* Mantém a cor do texto definida no componente pai */
     cursor: pointer; /* Mostra o cursor de link */
     &:hover {
     color: #fff; /* Cor ao passar o mouse */
     }
`;

const textoOpcoes = [
  { texto: 'NOSSOS PROFISSIONAIS', href: 'profissionais', externo: false },
  { texto: 'AGENDAMENTOS DISPONÍVEIS', href: 'agendamentos', externo: false },
  { texto: 'QUEM SOMOS', href: 'quem-somos', externo: false } // Rolagem para a seção "quem-somos"
];
 
function OpcoesHeader() {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleClick = (e, href, externo) => {
    if (href === 'agendamentos') {
      e.preventDefault();
      setCalendarOpen(true);
    } else if (!externo) {
      e.preventDefault();
      const element = document.getElementById(href);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };

  return (
    <>
      <Opcoes>
        {textoOpcoes.map(({ texto, href, externo }, index) =>
          !externo ? (
            <LinkStyled
              as="a"
              href={`#${href}`}
              key={index}
              onClick={(e) => handleClick(e, href, externo)}
            >
              <Opcao>
                <p>{texto}</p>
              </Opcao>
            </LinkStyled>
          ) : (
            <LinkStyled
              as="a"
              href={href}
              key={index}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Opcao>
                <p>{texto}</p>
              </Opcao>
            </LinkStyled>
          )
        )}
      </Opcoes>

      <ModalCalendar
        isOpen={calendarOpen}
        onClose={() => setCalendarOpen(false)}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
    </>
  );
}

export default OpcoesHeader;