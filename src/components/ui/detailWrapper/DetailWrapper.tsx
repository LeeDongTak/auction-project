import React from "react";
import { styled } from "styled-components";

interface Props {
  children: React.ReactNode;
}
const DetailWrapper = ({ children }: Props) => {
  return <StWrapper>{children}</StWrapper>;
};

const StWrapper = styled.section`
  max-width: 80%;
  margin: 0 auto;
  font-size: 1.6rem;
  line-height: 1.5;
  padding: 20px;
  p {
    white-space: pre-wrap;
  }
`;
export default DetailWrapper;
