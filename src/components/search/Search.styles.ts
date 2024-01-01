import { styled } from "styled-components";

export const StModalContainer = styled.div`
  position: fixed;
  top: 7rem;
  right: 0px;
  z-index: 5;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
`;

export const StModalBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  background-color: #fff;
  height: 100vh;
  z-index: 100;
  padding: 2rem;
  overflow: auto;
`;
