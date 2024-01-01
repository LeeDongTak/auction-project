import { Auction_answer } from "../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../common/Avatar";
import QnaTextArea from "./QnaTextArea";
import { transDate } from "../../../common/dayjs";
import QnaButtonGroup from "./QnaButtonGroup";
import { Event } from "./QuestionCard";
import { styled } from "styled-components";
import useFormInput from "../../../hooks/useFormInput";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import { useCustomModal } from "../../../hooks/useCustomModal";
import { useCustomMutation } from "../../../hooks/useCustomMutation";
import { fetchDeleteAnswer, fetchUpdateAnswer } from "../../../api/qna";
import { useQueryClient } from "@tanstack/react-query";
import useIsUpdateState from "../../../hooks/useIsUpdateState";

interface Props {
  answerData: Auction_answer | undefined;
  auctionId: string;
}
const QuestionAnswerCard = ({ answerData, auctionId }: Props) => {
  const queryClient = useQueryClient();
  const [answerUpdateText, answerUpdateRef, answerUpdateHandler] =
    useFormInput<HTMLTextAreaElement>(answerData?.answer);
  const [isUpdate, onClickIsUpdateHandler, setUpdate] = useIsUpdateState();
  const { user: userData } = useGetAuthInfo();
  const { handleOpenCustomModal } = useCustomModal();

  const updateMutationOptions = {
    mutationFn: fetchUpdateAnswer,
    onSuccess: async () => {
      await handleOpenCustomModal("수정 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });
      setUpdate(false);
    },
  };
  const updateMutate = useCustomMutation(updateMutationOptions);

  const deleteMutationOptions = {
    mutationFn: fetchDeleteAnswer,
    onSuccess: async () => {
      await handleOpenCustomModal("삭제 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });
    },
  };
  const deleteMutate = useCustomMutation(deleteMutationOptions);

  const onClickAnswerDeleteHandler = async (
    e: Event,
    auction_question_id: string
  ) => {
    if (await handleOpenCustomModal("정말 삭제하시겠습니까?", "confirm")) {
      deleteMutate(answerData?.auction_answer_id!);
    }
  };

  const onClickQuestionUpdateHandler = async (
    e: Event,
    auction_question_id: string
  ) => {
    if (answerUpdateText.trim() === "") {
      await handleOpenCustomModal("답변 내용을 입력해주세요.", "alert");
      answerUpdateRef.current?.focus();
      return;
    }

    if (answerUpdateText === answerData?.answer) {
      await handleOpenCustomModal("수정된 내용이 없습니다.", "alert");
      return;
    }

    const newAnswer: Pick<Auction_answer, "answer" | "auction_answer_id"> = {
      answer: answerUpdateText,
      auction_answer_id: answerData?.auction_answer_id!,
    };

    if (await handleOpenCustomModal("수정하시겠습니까?", "confirm")) {
      updateMutate(newAnswer);
    }
  };

  return (
    <>
      <StAnswerCardWrapper>
        <div>
          <ProfileAvatar
            size="4rem"
            alt="header profile"
            src={answerData?.user_info?.profile_image as string}
          />
        </div>
        <StAnswerCardInfo>
          <div>
            <h2>{answerData?.user_info?.nickname}</h2>
            <form>
              {isUpdate ? (
                <QnaTextArea
                  textState={answerUpdateText}
                  textHandler={answerUpdateHandler}
                  forwardRef={answerUpdateRef}
                />
              ) : (
                <p>{answerData?.answer}</p>
              )}
            </form>
          </div>
        </StAnswerCardInfo>
        <StCreateAt>
          <span>{transDate(answerData?.created_at!)}</span>
        </StCreateAt>
        {userData.id === answerData?.user_id && (
          <QnaButtonGroup
            isUpdateState={isUpdate}
            isUpdateStateHandler={onClickIsUpdateHandler}
            updateHandler={(e: Event) =>
              onClickQuestionUpdateHandler(e, answerData?.auction_question_id)
            }
            deleteHandler={(e: Event) =>
              onClickAnswerDeleteHandler(e, answerData?.auction_question_id)
            }
          />
        )}
      </StAnswerCardWrapper>
    </>
  );
};
const StAnswerCardWrapper = styled.article`
  display: flex;
  gap: 10px;
  align-items: center;
  border-left: 1px solid rgba(0, 0, 0, 0.2);
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
  border-radius: 0 0 5px 5px;
  position: relative;
  > div:nth-child(2) {
    flex: 2;
  }
`;

const StAnswerCardInfo = styled.div`
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

export default QuestionAnswerCard;
