import perfil from '../../assets/perfil.svg'
import sacola from '../../assets/sacola.svg'
import relogio from '../../assets/relogio.svg'
import './style.css'

const icones = [perfil, relogio]

function IconesHeader() {
     return (
          <ul className='icones'>
          {icones.map( (icone) => (
            <li className='icone'><img src={icone}></img></li>
          ) ) }
        </ul>
     )
}

export default IconesHeader