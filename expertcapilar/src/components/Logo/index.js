import logo from '../../assets/Luxury and Vintage Ornamental Coffee Shop Logo (1)_page-0001.jpg';
import styled from 'styled-components';

/* @media = modificacoes para a versao mobile */

const LogoContainer = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center; /* Garante centralização */
    max-width: 300px; /* Define um limite */
`;


const LogoImage = styled.img`
    margin-right: 10px;
    max-width:300px;
    max-height:150px;
    width: auto;
    height: auto;

    @media (max-width: 768px) {
        margin-right: 0;
        max-height:130px;
        max-width: 130px;
}
`

function Logo() {
    return (
        <LogoContainer>
            <LogoImage
            src={logo}
            alt='logo'
            />
        </LogoContainer>
    )
}

export default Logo;