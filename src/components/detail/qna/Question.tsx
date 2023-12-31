import { styled } from "styled-components";
import Title from "../bidPopup/Title";

interface Props {
  auctionId: string;
}

const Question = ({ auctionId }: Props) => {
  return (
    <StQuestionWrapper>
      <Title title={"Q&A"} titleAlign={"flex-start"} />
    </StQuestionWrapper>
  );
};

const StQuestionWrapper = styled.div``;
export default Question;
