import { styled } from "styled-components";
import { useCustomModal } from "../../../hooks/useCustomModal";
import useFormInput from "../../../hooks/useFormInput";
import { Spacer } from "../../ui/Spacer";

interface Props {
  auctionId: string;
}

const QuestionForm = ({ auctionId }: Props) => {
  const [questionText, questionTextRef, questionTextHandler] =
    useFormInput<HTMLTextAreaElement>();
  const { handleOpenCustomModal } = useCustomModal();

  const onSubmitQuestion = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!questionText) {
      await handleOpenCustomModal("질문 내용을 입력해주세요.", "alert");
      questionTextRef.current?.focus();
      return;
    }

    const { user: userData } = JSON.parse(
      localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
    );
    // 유저id 가져왔음.
    // 경매 id 가져왔음
    // 질문 게시글 생성
    const newQuestion = {
      user_id: userData.id,
      auction_id: auctionId,
    };
  };
  return (
    <StQuestionForm onSubmit={onSubmitQuestion}>
      <Spacer y={30} />
      <StQuestionContentWrapper>
        <textarea
          value={questionText}
          onChange={questionTextHandler}
          ref={questionTextRef}
        ></textarea>
        <div>
          <button>문의하기</button>
        </div>
      </StQuestionContentWrapper>
    </StQuestionForm>
  );
};
const StQuestionForm = styled.form`
  input,
  textarea {
    border: 2px solid rgba(0, 0, 0, 0.2);
    outline: none;
    border-radius: 5px;
    padding: 10px;
    font-size: 16px;
    transition: border-color 0.2s ease-in;
  }
`;

const StQuestionContentWrapper = styled.div`
  display: flex;
  gap: 10px;
  > textarea {
    width: 70%;
    height: 60px;
    border: 2px solid rgba(0, 0, 0, 0.2);
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

export default QuestionForm;
