import './style.css'

const textoOpcoes = ['HORÁRIOS MARCADOS', 'PROFISSIONAIS', 'QUEM SOMOS']

function OpcoesHeader() {
     return (
          <ul className='opcoes'>
               {textoOpcoes.map( (texto) => (
                    <li className='opcao'><p>{texto}</p></li>
               ) ) }
          </ul>
     )
}

export default OpcoesHeader