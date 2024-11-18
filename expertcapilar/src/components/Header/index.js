import Logo from '../Logo'
import OpcoesHeader from '../OpcoesHeader'
import IconesHeader from '../IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderContatiner = styled.header`
     background-color: #1b1b1b;
     display: flex;
     justify-content: space-between;
     align-items: center;
     flex-direction: row;
     padding: 10px 20px; 
     heigh: 80px;
`


function Header() {
     return (
          <HeaderContatiner>
               <Link to ='/'>
               <Logo />
               </Link>
               <OpcoesHeader />
               <IconesHeader />
          </HeaderContatiner>
     )
}

export default Header;