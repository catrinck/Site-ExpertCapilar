import logo from '../../assets/logo_barbearia.png';
import styled from 'styled-components';

const AboutLogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin-left: -20px; 
  padding: 0;
  transition: transform 0.4s ease;

  @media (max-width: 768px) {
    max-width: 280px;
    padding: 0 15px;
    margin-left: -15px;
  }
`;

const AboutLogoImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  max-width: 200px;
  opacity: 0.95;
  margin-top: 0px;
  transition: transform 0.4s ease;

  &:hover {
    opacity: 1;
  }

  @media (max-width: 768px) {
    max-width: 220px;
  }
`;

function AboutLogo() {
  return (
    <AboutLogoContainer>
      <AboutLogoImage
        src={logo}
        alt="Expert Capilar Logo"
        loading="eager"
      />
    </AboutLogoContainer>
  );
}

export default AboutLogo;