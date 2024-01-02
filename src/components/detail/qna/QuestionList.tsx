import { fetchGetQuestions } from "../../../api/qna";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { Auction_question } from "../../../types/databaseRetrunTypes";
import { styled } from "styled-components";
import { Skeleton } from "antd";
import QuestionCard from "./QuestionCard";
import { Spacer } from "../../ui/Spacer";
import { QuestionAnswerProvider } from "../../../context/AnswerContext";
import { useSelector } from "react-redux";
import { selectorAuctionSingleData } from "../../../redux/modules/auctionSingleDataSlice";

const QuestionList = () => {
  const {
    auctionData: { auction_id, user_id },
  } = useSelector(selectorAuctionSingleData);

  const questionsQueryOptions = {
    queryKey: ["questions", auction_id],
    queryFn: () => fetchGetQuestions(auction_id),
    queryOptions: { stableTime: Infinity },
  };

  const [data, isLoading] = useCustomQuery<Auction_question[], Error>(
    questionsQueryOptions
  );

  return (
    <StQuestionListWrapper>
      {data?.map((question) => (
        <div key={question.auction_question_id}>
          <Skeleton loading={isLoading} active>
            <QuestionAnswerProvider>
              <QuestionCard question={question} auctionUserId={user_id} />
            </QuestionAnswerProvider>
          </Skeleton>
          <Spacer y={30} />
        </div>
      ))}
    </StQuestionListWrapper>
  );
};

const StQuestionListWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
export default QuestionList;
