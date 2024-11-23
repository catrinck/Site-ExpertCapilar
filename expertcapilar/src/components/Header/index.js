import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* @media = modificações para a versao mobile*/

const HeaderContatiner = styled.header`
    background-color: #1b1b1b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 20px; 
    height: 130px;

    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
        padding: 10px;
    }
`;

const LogoContainer = styled.div`
    flex: 1;

    @media (max-width: 768px) {
        allign-items: center;
        display: 6px;
    }
`;

const OpcoesContainer = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        display: none; /* Esconde as opções em telas menores */
    }
`;

const IconesContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
        display: none; /* Esconde os ícones em telas menores */
    }
`;

function Header() {
    return (
        <HeaderContatiner>
            <LogoContainer>
                <Link to='/'>
                    <Logo />
                </Link>
            </LogoContainer>
            <OpcoesContainer>
                <OpcoesHeader />
            </OpcoesContainer>
            <IconesContainer>
                <IconesHeader />
            </IconesContainer>
        </HeaderContatiner>
    );
}

export default Header;
