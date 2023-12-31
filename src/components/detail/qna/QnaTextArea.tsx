import React from "react";

interface Props {
  textState: string;
  textHandler: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  forwardRef: React.RefObject<HTMLTextAreaElement>;
}
const QnaTextArea = ({ textState, textHandler, forwardRef }: Props) => {
  return (
    <textarea
      value={textState}
      onChange={textHandler}
      ref={forwardRef}
    ></textarea>
  );
};

export default QnaTextArea;
