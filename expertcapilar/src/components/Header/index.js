import Logo from '../Logo'
import OpcoesHeader from '../OpcoesHeader'
import IconesHeader from '../IconesHeader';
import styled from 'styled-components';

const HeaderContatiner = styled.header`
     background-color: #FFF;
     display: flex;
     justify-content: center;

`


function Header() {
     return (
          <HeaderContatiner>
               <Logo />
               <OpcoesHeader />
               <IconesHeader />
          </HeaderContatiner>
     )
}

export default Header