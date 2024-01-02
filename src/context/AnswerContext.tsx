//type 설정
import React, { createContext, useContext, useEffect, useState } from "react";

type AnswerContext = {
  isAnswerOpen: boolean;
  isAnimated: boolean;
  onClickAnswerOpenHandler: () => void;
  onAnswerCloseHandler: () => void;
};

// initialState 설정
const initialState: AnswerContext = {
  isAnswerOpen: false,
  isAnimated: false,
  onClickAnswerOpenHandler: () => {},
  onAnswerCloseHandler: () => {},
};

// context 생성
export const QuestionAnswerContext = createContext<AnswerContext>(initialState);

// provider 설정
export const QuestionAnswerProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [isAnswerOpen, setIsAnswerOpen] = useState<boolean>(false);
  const [isAnimated, setIsAnimated] = useState<boolean>(false);
  const onClickAnswerOpenHandler = () => {
    setIsAnimated((prev) => !prev);
  };
  const onAnswerCloseHandler = () => {
    if (!isAnimated) setIsAnswerOpen(false);
  };

  const value = {
    isAnswerOpen,
    isAnimated,
    onClickAnswerOpenHandler,
    onAnswerCloseHandler,
  };

  useEffect(() => {
    if (isAnimated) setIsAnswerOpen(true);
  }, [isAnimated]);

  return (
    <QuestionAnswerContext.Provider value={value}>
      {children}
    </QuestionAnswerContext.Provider>
  );
};
export const useQuestionAnswerContext = () => useContext(QuestionAnswerContext);
