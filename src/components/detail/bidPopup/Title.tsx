import React from "react";
import { styled } from "styled-components";

interface Props {
  title: string;
}
const Title = ({ title }: Props) => {
  return (
    <StTitleWrapper>
      <h1>{title}</h1>
    </StTitleWrapper>
  );
};

const StTitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  > h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Title;
