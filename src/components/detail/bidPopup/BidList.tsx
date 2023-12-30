import { fetchGetAuctionBidList } from "../../../api/bid";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { Bids } from "../../../types/databaseRetrunTypes";
import React from "react";
import { styled } from "styled-components";
import { BidCard } from "./BidCard";
import { Skeleton } from "antd";
import { Spacer } from "../../ui/Spacer";

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
