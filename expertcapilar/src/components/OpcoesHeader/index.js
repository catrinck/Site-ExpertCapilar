import styled from 'styled-components'
import { Link } from 'react-router-dom'

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

const LinkStyled = styled(Link)`
  text-decoration: none; /* Remove o sublinhado */
  color: inherit; /* Mantém a cor do texto definida no componente pai */
`;

const textoOpcoes = ['NOSSOS PROFISSIONAIS', 'AGENDAMENTOS DISPONÍVEIS', 'QUEM SOMOS']

function OpcoesHeader() {
     return (
          <Opcoes>
               {textoOpcoes.map( (texto) => (
                    <LinkStyled to={`/${texto.toLowerCase()}`}>
                    <Opcao><p>{texto}</p></Opcao>
                    </LinkStyled> 
               ) ) }
          </Opcoes>
     )
}

export default OpcoesHeader