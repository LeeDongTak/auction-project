import { styled } from "styled-components";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import { Spacer } from "../../ui/Spacer";

interface Props {
  auctionId: string;
}

const Question = ({ auctionId }: Props) => {
  return (
    <StQuestionWrapper>
      <QuestionForm auctionId={auctionId} />
      <Spacer y={40} />
      <QuestionList auctionId={auctionId} />
    </StQuestionWrapper>
  );
};

const StQuestionWrapper = styled.div`
  padding: 0 30px;
`;

export default Question;
