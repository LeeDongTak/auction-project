import { keyframes, styled } from "styled-components";
import QnaTextArea from "./QnaTextArea";
import useFormInput from "../../../hooks/useFormInput";
import { useQuestionAnswerContext } from "../../../context/AnswerContext";

const QuestionAnswerWrapper = () => {
  const [answerText, answerRef, onChangeAnswer, setAnswerState] =
    useFormInput<HTMLTextAreaElement>();
  const { isAnimated, onAnswerCloseHandler } = useQuestionAnswerContext();

  //TODO: 여기부터.

  return (
    <StQuestionAnswerWrapper
      $isAnimated={isAnimated}
      onAnimationEnd={onAnswerCloseHandler}
    >
      <h1>답변</h1>
      <form>
        <QnaTextArea
          textState={answerText}
          textHandler={onChangeAnswer}
          forwardRef={answerRef}
        />
      </form>
      <div>
        <button>답변등록</button>
      </div>
    </StQuestionAnswerWrapper>
  );
};
const slideUp = keyframes`
  from {
    height: 200px;
  }
  to {
    height: 0;
  }
`;
const slideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: 200px;
  }
`;

const textareaSlideUp = keyframes`
  from {
    height: 80px;
  }
  to {
    height: 0;
  }
`;
const textareaSlideDown = keyframes`
  from {
    height: 0;
  }
  to {
    height: 80px;
  }
`;

const StQuestionAnswerWrapper = styled.div<{ $isAnimated: boolean }>`
  display: flex;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  transition: all 0.2s ease-in;
  animation: ${({ $isAnimated }) => ($isAnimated ? slideDown : slideUp)} 0.3s
    forwards;

  gap: 10px;
  padding: 10px;
  align-items: center;
  > h1 {
    flex: 1;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
  > form {
    flex: 5;
  }
  > form > textarea {
    width: 100%;
    height: 80px;
    font-size: 16px;
    padding: 10px;
    animation: ${({ $isAnimated }) =>
        $isAnimated ? textareaSlideDown : textareaSlideUp}
      0.2s forwards;
  }
  > div:last-child > button {
    flex: 1;
    font-size: 16px;
    font-weight: bold;
    background-color: unset;
    border: 1px solid rgba(0, 0, 0, 0.2);
    width: 80px;
    height: 40px;
    border-radius: 5px;
    transition: all 0.2s ease-in;

    &:hover {
      background-color: var(--main-color);
      color: white;
    }
  }
`;
export default QuestionAnswerWrapper;
