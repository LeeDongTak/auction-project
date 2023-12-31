import { fetchGetQuestions } from "../../../api/qna";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { Auction_question } from "../../../types/databaseRetrunTypes";
import { styled } from "styled-components";
import { Skeleton } from "antd";
import QuestionCard from "./QuestionCard";
import { Spacer } from "../../ui/Spacer";

interface Props {
  auctionId: string;
}

const QuestionList = ({ auctionId }: Props) => {
  // data fetch
  const questionsQueryOptions = {
    queryKey: ["questions", auctionId],
    queryFn: () => fetchGetQuestions(auctionId),
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
            <QuestionCard question={question} />
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
