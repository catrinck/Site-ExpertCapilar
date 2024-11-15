import styled from 'styled-components'

const Opcao = styled.li`
     font-size: 18px;
     display: flex;
     justify-content: center;
     align-items: center;
     text-align: center;
     min-width: 120px;
     padding: 0 5px;
     cursor: pointer;
     height: 100%;
`

const Opcoes = styled.ul`
     display: flex;
`

const textoOpcoes = ['CATEGORIAS', 'FAVORITOS', 'MINHA ESTANTE']

function OpcoesHeader() {
     return (
          <Opcoes>
               {textoOpcoes.map( (texto) => (
                    <Opcao><p>{texto}</p></Opcao>
               ) ) }
          </Opcoes>
     )
}

export default OpcoesHeader