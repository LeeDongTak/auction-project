import { styled } from "styled-components";
import { useCustomModal } from "../../../hooks/useCustomModal";
import useFormInput from "../../../hooks/useFormInput";
import { Spacer } from "../../ui/Spacer";
import { fetchPostQuestion } from "../../../api/qna";
import React from "react";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import { Auction_question } from "../../../types/databaseRetrunTypes";
import { useQueryClient } from "@tanstack/react-query";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import QnaTextArea from "./QnaTextArea";

interface Props {
  auctionId: string;
}

const QuestionForm = ({ auctionId }: Props) => {
  const queryClient = useQueryClient();
  const [questionText, questionTextRef, questionTextHandler, questionSetText] =
    useFormInput<HTMLTextAreaElement>();
  const { handleOpenCustomModal } = useCustomModal();
  const { user: userData } = useGetAuthInfo();

  const QuestionMutationOptions = {
    mutationFn: fetchPostQuestion,
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });
      await handleOpenCustomModal("질문이 등록되었습니다.", "alert");
      questionSetText("");
    },
  };
  const mutation = useCustomMutation(QuestionMutationOptions);

  const onSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!questionText) {
      await handleOpenCustomModal("질문 내용을 입력해주세요.", "alert");
      questionTextRef.current?.focus();
      return;
    }

    const newQuestion: Pick<
      Auction_question,
      "user_id" | "auction_id" | "question"
    > = {
      user_id: userData.id,
      auction_id: auctionId,
      question: questionText,
    };
    mutation(newQuestion);
  };
  return (
    <StQuestionForm onSubmit={onSubmitQuestion}>
      <Spacer y={30} />
      <StQuestionContentWrapper>
        <QnaTextArea
          textState={questionText}
          textHandler={questionTextHandler}
          forwardRef={questionTextRef}
        />
        <div>
          <button>문의하기</button>
        </div>
      </StQuestionContentWrapper>
    </StQuestionForm>
  );
};
const StQuestionForm = styled.form``;

const StQuestionContentWrapper = styled.div`
  display: flex;
  gap: 10px;
  > textarea {
    border: 2px solid rgba(0, 0, 0, 0.2);
    outline: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
    width: 70%;
    height: 60px;
    &:focus {
      border-color: var(--main-color);
    }
  }

  > div {
    top: 10px;
    right: 10px;
    > button {
      cursor: pointer;
      width: 120px;
      height: 100%;
      font-size: 16px;
      font-weight: bold;
      background-color: unset;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 5px;
      transition: all 0.2s ease-in;
      &:hover {
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
        background-color: var(--main-color);
        color: white;
      }
      > svg {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

export default React.memo(QuestionForm);
