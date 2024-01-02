import { Skeleton } from "antd";
import React from "react";
import { styled } from "styled-components";
import { fetchGetAuctionBidList } from "../../../api/bid";
import { useCustomQuery } from "../../../hooks/useCustomQuery";
import { Bids } from "../../../types/databaseRetrunTypes";
import { AuctionStatus } from "../../../types/detailTyps";
import { useSelector } from "react-redux";
import { selectorAuctionSingleData } from "../../../redux/modules/auctionSingleDataSlice";
import { Spacer } from "../../ui/Spacer";
import { BidCard } from "./BidCard";
import Title from "./Title";

const BidList = () => {
  const {
    auctionData: { auction_id, auction_status },
  } = useSelector(selectorAuctionSingleData);

  const bidListQueryOptions = {
    queryKey: ["getBidList", auction_id],
    queryFn: () => fetchGetAuctionBidList(auction_id),
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
        <Title
          title={`${
            Number(auction_status) === AuctionStatus.END
              ? "경매 종료"
              : "입찰 현황"
          }`}
        />
      </Skeleton>
      <Spacer y={30} />
      {data?.length === 0 && (
        <StNonBidWrapper>
          <Skeleton
            loading={isLoading}
            active
            style={{ width: "100%", height: "10px" }}
          >
            <h1>입찰자가 없습니다.</h1>
          </Skeleton>
        </StNonBidWrapper>
      )}
      {data?.map((bid: Bids, index) => (
        <div key={bid.bid_id}>
          <Skeleton
            loading={isLoading}
            active
            style={{ width: "100%", height: "10px" }}
          >
            <BidCard key={bid.bid_id} bidData={bid} cardIndex={index} />
          </Skeleton>
          <Spacer y={10} />
        </div>
      ))}
    </StBidListWrapper>
  );
};

const StBidListWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 40px 20px;
`;

const StNonBidWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  > h1 {
    font-size: 30px;
    font-weight: bold;
    text-align: center;
    margin: auto;
  }
`;
export default React.memo(BidList);
