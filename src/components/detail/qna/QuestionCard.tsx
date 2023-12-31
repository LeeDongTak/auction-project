import { Auction_question } from "../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../../common/avatar";
import { styled } from "styled-components";
import { transDate } from "../../../common/dayjs";
import React from "react";
import { useCustomModal } from "../../../hooks/useCustomModal";
import useIsUpdateState from "../../../hooks/useIsUpdateState";
import QnaTextArea from "./QnaTextArea";
import useFormInput from "../../../hooks/useFormInput";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import QnaButtonGroup from "./QnaButtonGroup";
import QuestionAnswerWrapper from "./QuestionAnswerWrapper";
import { useQuestionAnswerContext } from "../../../context/AnswerContext";
import useQnaTanstackQuery from "../../../hooks/useQnaTanstackQuery";

interface Props {
  question: Auction_question;
  auctionUserId: string;
}
export type Event = React.MouseEvent<HTMLButtonElement>;

const QuestionCard = ({ question, auctionUserId }: Props) => {
  const { user: userData } = useGetAuthInfo();
  const { handleOpenCustomModal } = useCustomModal();
  const [isUpdate, onClickIsUpdateHandler, setIsUpdate] = useIsUpdateState();
  const [questionUpdateText, questionUpdateRef, questionUpdateHandler] =
    useFormInput<HTMLTextAreaElement>(question.question);

  const { isAnswerOpen, onClickAnswerOpenHandler } = useQuestionAnswerContext();
  const { deleteMutate, updateMutate } = useQnaTanstackQuery(
    question.auction_id,
    setIsUpdate
  );

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

  const onStQuestionCardWrapperClick = () => {
    if (userData.id === auctionUserId) onClickAnswerOpenHandler();
  };

  return (
    <>
      <StQuestionCardWrapper
        $isAnswerOpen={isAnswerOpen}
        $isUser={userData.id === auctionUserId}
        onClick={onStQuestionCardWrapperClick}
      >
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
        {userData.id === question.user_id && (
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
      {isAnswerOpen && <QuestionAnswerWrapper />}
    </>
  );
};

const StQuestionCardWrapper = styled.article<{
  $isAnswerOpen: boolean;
  $isUser: boolean;
}>`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 5px 5px
    ${({ $isAnswerOpen }) => ($isAnswerOpen ? "0 0" : "5px 5px")};

  cursor: ${({ $isUser }) => ($isUser ? "pointer" : "auto")};
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

export default React.memo(QuestionCard);
