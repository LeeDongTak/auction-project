import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { keyframes, styled } from "styled-components";
import { fetchPostAnswer } from "../../../api/qna";
import { useQuestionAnswerContext } from "../../../context/AnswerContext";
import { useCustomModal } from "../../../hooks/useCustomModal";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import useFormInput from "../../../hooks/useFormInput";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import { Auction_answer } from "../../../types/databaseRetrunTypes";
import QnaTextArea from "./QnaTextArea";

interface Props {
  auctionQuestionId: string;
  auctionId: string;
}

const QuestionAnswerWrapper = ({ auctionQuestionId, auctionId }: Props) => {
  const queryClient = useQueryClient();
  const [answerText, answerRef, onChangeAnswer, setAnswerState] =
    useFormInput<HTMLTextAreaElement>();
  const { isAnimated, onAnswerCloseHandler } = useQuestionAnswerContext();
  const { handleOpenCustomModal } = useCustomModal();
  const user = useGetAuthInfo();

  const answerMutationOptions = {
    mutationFn: fetchPostAnswer,
    onSuccess: async () => {
      await handleOpenCustomModal("답변이 등록되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });

      setAnswerState("");
    },
  };

  const answerPostMutation = useCustomMutation(answerMutationOptions);
  //TODO: 여기부터.
  const onSubmitAnswerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (answerText.trim() === "") {
      await handleOpenCustomModal("답변 내용을 입력해주세요.", "alert");
      answerRef.current?.focus();
      return;
    }

    const answer: Pick<
      Auction_answer,
      "user_id" | "answer" | "auction_question_id"
    > = {
      answer: answerText,
      user_id: user?.user.id as string,
      auction_question_id: auctionQuestionId,
    };

    if (await handleOpenCustomModal("답변을 등록하시겠습니까?", "confirm")) {
      answerPostMutation(answer);
    }
  };

  return (
    <StQuestionAnswerWrapper
      $isAnimated={isAnimated}
      onAnimationEnd={onAnswerCloseHandler}
    >
      <h1>답변</h1>
      <StQuestionAnswerForm
        onSubmit={onSubmitAnswerHandler}
        $isAnimated={isAnimated}
      >
        <QnaTextArea
          textState={answerText}
          textHandler={onChangeAnswer}
          forwardRef={answerRef}
        />
        <div>
          <button type={"submit"}>답변등록</button>
        </div>
      </StQuestionAnswerForm>
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
  flex-direction: column;
  align-items: flex-start;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 0 0 5px 5px;
  transition: all 0.2s ease-in;
  animation: ${({ $isAnimated }) => ($isAnimated ? slideDown : slideUp)} 0.3s
    forwards;
  gap: 10px;
  padding: 20px 10px;
  > h1 {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
`;

const StQuestionAnswerForm = styled.form<{ $isAnimated: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  height: 100%;
  gap: 10px;
  > textarea {
    width: 100%;
    height: 80px;
    font-size: 16px;
    padding: 10px;
    animation: ${({ $isAnimated }) =>
        $isAnimated ? textareaSlideDown : textareaSlideUp}
      0.2s forwards;
  }
  > div:last-child > button {
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
