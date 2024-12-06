import Logo from '../Logo';
import OpcoesHeader from '../OpcoesHeader';
import IconesHeader from '../IconesHeader';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

/* @media = modificações para a versão mobile */

const HeaderContatiner = styled.header`
    background-color: #1b1b1b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;
    padding: 10px 20px;
    height: 130px;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;

    @media (max-width: 768px) {
        flex-direction: row;
        height: auto;
        padding: 10px;
        justify-content: space-between; 
    }
`;

const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        flex: initial; 
    }
`;

const OpcoesContainer = styled.div`
    flex: 2;
    display: flex;
    justify-content: center;

    @media (max-width: 768px) {
        display: none;
    }
`;

const IconesContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 768px) {
        display: flex; // Show icons on mobile
        flex: initial; // Remove flex grow
    }
`;


const AppContainer = styled.div`
    margin: 0;
    padding: 0;
    width: 100%;
    max-width: 100vw;
    overflow-x: hidden;
`;

function Header() {
    return (
        <AppContainer>
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
        </AppContainer>
    );
}

export default Header;
