import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import { styled } from "styled-components";
import { fetchDeleteQuestion, fetchUpdateQuestion } from "../../../api/qna";
import { transDate } from "../../../common/dayjs";
import { useCustomModal } from "../../../hooks/useCustomModal";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import useFormInput from "../../../hooks/useFormInput";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import useIsUpdateState from "../../../hooks/useIsUpdateState";
import { Auction_question } from "../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../common/Avatar";
import QnaButtonGroup from "./QnaButtonGroup";
import QnaTextArea from "./QnaTextArea";

interface Props {
  question: Auction_question;
}
export type Event = React.MouseEvent<HTMLButtonElement>;

const QuestionCard = ({ question }: Props) => {
  const queryClient = useQueryClient();
  const { user: userdata } = useGetAuthInfo();
  const { handleOpenCustomModal } = useCustomModal();
  const [isUpdate, onClickIsUpdateHandler, setIsUpdate] = useIsUpdateState();
  const [questionUpdateText, questionUpdateRef, questionUpdateHandler] =
    useFormInput<HTMLTextAreaElement>(question.question);

  const questionDeleteMutationOptions = {
    mutationFn: fetchDeleteQuestion,
    onSuccess: async () => {
      await handleOpenCustomModal("삭제 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.auction_id],
      });
    },
  };

  const questionUpdateMutationOptions = {
    mutationFn: fetchUpdateQuestion,
    onSuccess: async () => {
      await handleOpenCustomModal("수정 완료 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", question.auction_id],
      });
      setIsUpdate(false);
    },
  };

  const deleteMutate = useCustomMutation(questionDeleteMutationOptions);
  const updateMutate = useCustomMutation(questionUpdateMutationOptions);

  const onClickQuestionDeleteHandler = async (
    e: Event,
    auction_question_id: string
  ) => {
    if (await handleOpenCustomModal("정말 삭제하시겠습니까?", "confirm")) {
      deleteMutate(auction_question_id);
    }
  };

  const onClickQuestionUpdateHandler = async (
    e: Event,
    auction_question_id: string
  ) => {
    if (questionUpdateText.trim() === "") {
      await handleOpenCustomModal("질문 내용을 입력해주세요.", "alert");
      questionUpdateRef.current?.focus();
      return;
    }

    if (questionUpdateText === question.question) {
      await handleOpenCustomModal("수정된 내용이 없습니다.", "alert");
      return;
    }

    const newQuestion: Pick<
      Auction_question,
      "question" | "auction_question_id"
    > = {
      question: questionUpdateText,
      auction_question_id,
    };

    if (await handleOpenCustomModal("수정하시겠습니까?", "confirm")) {
      updateMutate(newQuestion);
    }
  };

  return (
    <>
      <StQuestionCardWrapper>
        <div>
          <ProfileAvatar
            size="4rem"
            alt="header profile"
            src={question?.user_info?.profile_image as string}
          />
        </div>
        <StQuestionCardInfo>
          <div>
            <h2>{question.user_info?.nickname}</h2>
            <form>
              {isUpdate ? (
                <QnaTextArea
                  textState={questionUpdateText}
                  textHandler={questionUpdateHandler}
                  forwardRef={questionUpdateRef}
                />
              ) : (
                <p>{question.question}</p>
              )}
            </form>
          </div>
        </StQuestionCardInfo>
        <StCreateAt>
          <span>{transDate(question.created_at)}</span>
        </StCreateAt>
        {userdata.id === question.user_id && (
          <QnaButtonGroup
            isUpdateState={isUpdate}
            isUpdateStateHandler={onClickIsUpdateHandler}
            updateHandler={(e: Event) =>
              onClickQuestionUpdateHandler(e, question.auction_question_id)
            }
            deleteHandler={(e: Event) =>
              onClickQuestionDeleteHandler(e, question.auction_question_id)
            }
          />
        )}
      </StQuestionCardWrapper>
    </>
  );
};

const StQuestionCardWrapper = styled.article`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 5px;
  position: relative;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
  > div:nth-child(2) {
    flex: 2;
  }
`;

const StQuestionCardInfo = styled.div`
  > div > h2 {
    font-size: 1.6rem;
    font-weight: bold;
  }
  > div > form > p {
    font-size: 1.6rem;
    white-space: pre-wrap;
  }
  > div > form > textarea {
    width: 80%;
    height: 60px;
    font-size: 16px;
    padding: 10px;
  }
`;

const StCreateAt = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
  align-self: flex-end;
`;

export default QuestionCard;
