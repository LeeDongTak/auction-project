import { styled } from "styled-components";
import QuestionForm from "./QuestionForm";

interface Props {
  auctionId: string;
}

const Question = ({ auctionId }: Props) => {
  return (
    <StQuestionWrapper>
      <QuestionForm auctionId={auctionId} />
    </StQuestionWrapper>
  );
};

const StQuestionWrapper = styled.div`
  padding: 0 30px;
`;

export default Question;
