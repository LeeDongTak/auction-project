import { styled } from "styled-components";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import { Spacer } from "../../ui/Spacer";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

interface Props {
  auctionId: string;
  auctionUserId: string;
}

const Question = ({ auctionId, auctionUserId }: Props) => {
  const user = useGetAuthInfo();
  return (
    <StQuestionWrapper>
      {user?.user.id !== auctionUserId && (
        <>
          <QuestionForm auctionId={auctionId} />
          <Spacer y={30} />
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
