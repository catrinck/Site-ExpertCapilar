import logo from '../../assets/logo_barbearia.png';
import styled from 'styled-components';

// LOGO DO HEADER

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  max-width: 150px;
  padding: 10px;

  @media (max-width: 768px) {
    max-width: 130px;
    padding: 5px;
  }
`;

const LogoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;

  @media (max-width: 768px) {
    max-height: 120px;
  }
`;

function HeaderLogo() {
  return (
    <LogoContainer>
      <LogoImage
        src={logo}
        alt="Expert Capilar"
        loading="eager"
      />
    </LogoContainer>
  );
}

export default HeaderLogo;