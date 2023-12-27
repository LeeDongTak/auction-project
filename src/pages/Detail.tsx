import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { fetchGetAuctionById } from "../api/auction";
import { Auction_post } from "../types/databaseRetrunTypes";

const Detail = () => {
  const { auctionId } = useParams();
  const queryOptions = {
    queryKey: ["getAuction"],
    queryFn: () => fetchGetAuctionById(auctionId!),
    queryOptions: { staleTime: Infinity },
  };
  const data = useCustomQuery<Auction_post, Error>(queryOptions);

  console.log(data);

  return (
    <StDetailWrapper>
      <StDetailInfo></StDetailInfo>
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
`;

const StDetailInfo = styled.section``;

export default Detail;
