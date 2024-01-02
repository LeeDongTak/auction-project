import { styled } from "styled-components";
import useGetAuthInfo from "../../../hooks/useGetAuthInfo";
import { Spacer } from "../../ui/Spacer";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";
import { useSelector } from "react-redux";
import { selectorAuctionSingleData } from "../../../redux/modules/auctionSingleDataSlice";

const Question = () => {
  const {
    auctionData: { user_id },
  } = useSelector(selectorAuctionSingleData);
  const user = useGetAuthInfo();
  return (
    <StQuestionWrapper>
      {user?.user.id !== user_id && (
        <>
          <QuestionForm />
          <Spacer y={30} />
        </>
      )}
      <QuestionList />
    </StQuestionWrapper>
  );
};

const StQuestionWrapper = styled.div`
  padding: 0 30px;
`;

export default Question;
