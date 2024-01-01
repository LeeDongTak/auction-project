import React from "react";
import { styled } from "styled-components";

interface Props {
  textState: string;
  textHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  forwardRef: React.RefObject<HTMLTextAreaElement>;
}
const QnaTextArea = ({ textState, textHandler, forwardRef }: Props) => {
  return (
    <StTextarea
      value={textState}
      onChange={textHandler}
      ref={forwardRef}
    ></StTextarea>
  );
};

const StTextarea = styled.textarea`
  resize: none;
`;
export default QnaTextArea;
