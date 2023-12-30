import { fetchGetAuctionBidList } from "../../../api/bid";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { Bids } from "../../../types/databaseRetrunTypes";
import React from "react";
import { styled } from "styled-components";
import { BidCard } from "./BidCard";
import { Skeleton } from "antd";
import { Spacer } from "../../ui/Spacer";
import Title from "./Title";

interface Props {
  auctionId: string;
}

const BidList = ({ auctionId }: Props) => {
  const bidListQueryOptions = {
    queryKey: ["getBidList", auctionId],
    queryFn: () => fetchGetAuctionBidList(auctionId),
    queryOptions: { stableTime: Infinity },
  };

  const [data, isLoading] = useCustomQuery<Bids[], Error>(bidListQueryOptions);

  return (
    <StBidListWrapper>
      <Skeleton
        loading={isLoading}
        active
        title
        style={{ width: "100%", height: "5px" }}
      >
        <Title title={"입찰 현황"} />
      </Skeleton>
      <Spacer y={30} />
      {data?.map((bid: Bids, index) => (
        <>
          <Skeleton
            key={bid.bid_id}
            loading={isLoading}
            active
            style={{ width: "100%", height: "10px" }}
          >
            <BidCard bidData={bid} cardIndex={index} />
          </Skeleton>
          <Spacer y={10} />
        </>
      ))}
    </StBidListWrapper>
  );
};

const StBidListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 40px 20px;
`;
export default React.memo(BidList);
