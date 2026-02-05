import React from "react";
import styled from "styled-components";

const Loader = ({ padding, margin }) => {
  return (
    <StyledWrapper>
      <div className="spinner center">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="spinner-blade" />
        ))}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  width: 100vw;
  background-color: transparent;
  position: absolute;
  top: 50;
  left: 0;
  z-index: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  .spinner {
    font-size: 28px;
    position: relative;
    width: 1em;
    height: 1em;
  }

  .spinner .spinner-blade {
    position: absolute;
    left: 0.4629em;
    bottom: 0;
    width: 0.074em;
    height: 0.2777em;
    border-radius: 0.0555em;
    background-color: transparent;
    transform-origin: center -0.2222em;
    animation: spinner-fade 1s infinite linear;
  }

  ${[...Array(12)]
    .map(
      (_, i) => `
    .spinner .spinner-blade:nth-child(${i + 1}) {
      animation-delay: ${i * 0.083}s;
      transform: rotate(${i * 30}deg);
    }
  `,
    )
    .join("")}

  @keyframes spinner-fade {
    0% {
      background-color: #ffffff;
    }
    100% {
      background-color: transparent;
    }
  }
`;

export default Loader;
