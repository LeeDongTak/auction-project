import { styled } from "styled-components";
import React from "react";

type Props = {
  handler: (e: React.MouseEvent<HTMLElement>) => void;
};

const CloseButton = ({ handler }: Props) => {
  return (
    <StCloseButton>
      <div>
        <button onClick={handler}></button>
      </div>
    </StCloseButton>
  );
};
const StCloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: unset;
  border: unset;
  top: 15px;
  right: 15px;
  height: 20px;
  > div {
    position: relative;
    > button {
      cursor: pointer;
      background-color: unset;
      border: unset;
      width: 40px;
      height: 40px;
    }
    > button::after,
    > button::before {
      position: absolute;
      left: 50%;
      top: 50%;
      will-change: transform, margin-top;
      transition-property: transform, margin-top;
      transition-duration: 300ms;
      transition-timing-function: ease-out;
      content: "";
      width: 2rem;
      height: 0.3rem;
      z-index: 100;
      background-color: black;
    }
    > button:after {
      transform: translate(-50%, -50%) rotateZ(-45deg);
    }
    > button:before {
      transform: translate(-50%, -50%) rotateZ(45deg);
    }
    > button:hover:after {
      transform: translate(-50%, -50%) rotateZ(45deg);
      background-color: black;
    }
    > button:hover:before {
      transform: translate(-50%, -50%) rotateZ(-45deg);
      background-color: black;
    }
  }
`;

export default CloseButton;
