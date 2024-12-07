import styled from 'styled-components';

export const CarouselContainer = styled.div`
  background-color: #121212;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
  width: 100%;
`;

export const CarouselWrapper = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  width: 80%;
  position: relative;
  touch-action: pan-y pinch-zoom;
  
  @media (max-width: 768px) {
    width: 95%;
  }
`;

export const ImageList = styled.div`
  display: flex;
  will-change: transform;
  transform: translateX(${({translate}) => translate}%);
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const ImageItem = styled.img`
  width: ${({slideWidth}) => slideWidth}%;
  height: 200px;
  object-fit: cover;
  margin: 0 10px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }
  
  @media (max-width: 768px) {
    height: 150px;
  }
`;

export const ArrowButton = styled.button`
  background-color: #ff342b;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-size: 1.5rem;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${({disabled}) => disabled ? 0.5 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background-color: #e52e26;
    transform: translateY(-50%) scale(1.1);
  }

  &:active:not(:disabled) {
    transform: translateY(-50%) scale(0.95);
  }

  &:disabled {
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 30px;
    height: 30px;
    font-size: 1rem;
  }
`;

export const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

export const RightArrow = styled(ArrowButton)`
  right: 10px;
`;