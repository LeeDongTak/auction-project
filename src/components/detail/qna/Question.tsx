import { styled } from "styled-components";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import { Spacer } from "../../ui/Spacer";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";

interface Props {
  auctionId: string;
  auctionUserId: string;
}

const Question = ({ auctionId, auctionUserId }: Props) => {
  const { user: userData } = useGetAuthInfo();
  return (
    <StQuestionWrapper>
      {userData.id !== auctionUserId && (
        <>
          <QuestionForm auctionId={auctionId} />
          <Spacer y={40} />
        </>
      )}
      <QuestionList auctionId={auctionId} auctionUserId={auctionUserId} />
    </StQuestionWrapper>
  );
};

const StQuestionWrapper = styled.div`
  padding: 0 30px;
`;

export default Question;
