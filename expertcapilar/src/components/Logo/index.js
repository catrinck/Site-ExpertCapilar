import logo from '../../assets/Luxury and Vintage Ornamental Coffee Shop Logo (1)_page-0001.jpg';
import styled from 'styled-components';

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 30px;
  margin-right: 20px; /* Espaço entre a logo e as opções */
`;

const LogoImage = styled.img`
    margin-right: 10px;
    max-width:300px;
    max-height:150px;
    width: auto;
    height: auto;
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