import React from 'react';
import styled from 'styled-components';

const Button = () => {
  return (
    <StyledWrapper>
      <button className="button">
        <svg xmlns="http://www.w3.org/2000/svg" width={24} viewBox="0 0 24 24" height={24} fill="none" className="svg-icon"><g strokeWidth={2} strokeLinecap="round" stroke="#fff"><rect y={5} x={4} width={16} rx={2} height={16} /><path d="m8 3v4" /><path d="m16 3v4" /><path d="m4 11h16" /></g></svg>
        <span className="lable">Agendar</span>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 9px 12px;
    gap: 8px;
    height: 40px;
    width: 201px;
    border: none;
    background: #FF342B;
    border-radius: 20px;
    cursor: pointer;
  }

  .lable {
    line-height: 22px;
    font-size: 17px;
    color: #fff;
    font-family: sans-serif;
    letter-spacing: 1px;
  }

  .button:hover {
    background: #e52e26;
  }

  .button:hover .svg-icon {
    animation: slope 1s linear infinite;
  }

  @keyframes slope {
    0% {
    }

    50% {
      transform: rotate(10deg);
    }

    100% {
    }
  }`;

export default Button;