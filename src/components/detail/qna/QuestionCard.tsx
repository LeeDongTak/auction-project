import { Auction_question } from "../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../../common/avatar";
import { styled } from "styled-components";
import { transDate } from "../../../common/dayjs";
import useGetUserInfo from "../../../hooks/useGetUserInfo";

interface Props {
  question: Auction_question;
}

const QuestionCard = ({ question }: Props) => {
  const userData = useGetUserInfo();

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
              <p>{question.question}</p>
            </form>
          </div>
          <div></div>
        </StQuestionCardInfo>
        <StCreateAt>
          <span>{transDate(question.created_at)}</span>
        </StCreateAt>
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
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
  > div:nth-child(2) {
    flex: 2;
  }
`;

const StQuestionCardInfo = styled.div`
  > h2 {
    font-size: 1.6rem;
    font-weight: bold;
  }
  > p {
    font-size: 1.6rem;
    white-space: pre-wrap;
  }
`;

const StCreateAt = styled.div`
  font-size: 12px;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.4);
  align-self: flex-end;
`;
export default QuestionCard;
