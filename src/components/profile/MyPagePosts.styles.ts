import { styled } from "styled-components";

export const StListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
  padding: 1rem 2.5rem;
  margin-top: 1rem;

  @media (max-width: 650px) {
    padding: 0;
  }

  h2 {
    font-size: x-large;
    font-weight: 500;
  }
`;
