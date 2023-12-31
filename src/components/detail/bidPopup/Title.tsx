import React from "react";
import { styled } from "styled-components";

interface Props {
  title: string;
  titleAlign?: string;
}
const Title = ({ title, titleAlign = "center" }: Props) => {
  return (
    <StTitleWrapper $titleAlign={titleAlign}>
      <h1>{title}</h1>
    </StTitleWrapper>
  );
};

const StTitleWrapper = styled.div<{ $titleAlign: string }>`
  display: flex;
  justify-content: ${({ $titleAlign }) => $titleAlign};
  > h1 {
    font-size: 24px;
    font-weight: bold;
  }
`;

export default Title;
