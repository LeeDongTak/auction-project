import React from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { fetchGetAuctionById } from "../api/auction";
import DetailContent from "../components/detail/DetailContent";
import DetailInfo from "../components/detail/DetailInfo";
import DetailTimeStamp from "../components/detail/DetailTimeStamp";
import { Spacer } from "../components/ui/Spacer";
import useAuctionStatus from "../hooks/useAuctionStatus";
import { useCustomQuery } from "../hooks/useCustomQuery";
import placeholder from "../images/placeholder.svg";
import { Auction_post, MaxBids } from "../types/databaseRetrunTypes";
import { fetchAuctionMaxBid } from "../api/bid";
import { Skeleton } from "antd";

const Detail = () => {
  const { auctionId } = useParams();
  const queryAuctionOptions = {
    queryKey: ["getAuction"],
    queryFn: () => fetchGetAuctionById(auctionId!),
    queryOptions: { staleTime: Infinity },
  };
  const [data, isLoading] = useCustomQuery<Auction_post, Error>(
    queryAuctionOptions
  );

  const thumbnailImg = data?.auction_images?.[0]?.image_path ?? placeholder;

  const queryBidOptions = {
    queryKey: ["getBidMaxPrice", auctionId],
    queryFn: () => fetchAuctionMaxBid(auctionId!),
    queryOptions: { staleTime: 0 },
  };

  const [bidData, bidIsLoading] = useCustomQuery<MaxBids, Error>(
    queryBidOptions
  );

  useAuctionStatus(data);

  return (
    <StDetailWrapper>
      <StDetailInfo>
        <StDetailImgWrapper>
          {isLoading ? (
            <StSkeletonImageWrapper
              active
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <img src={thumbnailImg} alt={data?.title} />
          )}
        </StDetailImgWrapper>

        <Skeleton
          loading={isLoading}
          active
          title
          paragraph={{ rows: 8 }}
          style={{ maxWidth: "300px", width: "100%", height: "100%" }}
        >
          <DetailInfo auctionData={data} maxBid={bidData} />
        </Skeleton>
      </StDetailInfo>
      <Spacer y={40} />

      <Skeleton
        loading={isLoading}
        active
        title
        style={{ width: "500px", height: "100%", margin: "0 auto" }}
      >
        <DetailTimeStamp maxBid={bidData} />
      </Skeleton>

      <Spacer y={20} />

      <Skeleton
        loading={isLoading}
        active
        paragraph={{ rows: 10 }}
        style={{ width: "100%", height: "100%" }}
      >
        <DetailContent auctionContent={data?.content} />
      </Skeleton>
    </StDetailWrapper>
  );
};

const StDetailWrapper = styled.main`
  max-width: 1200px;
  width: 100%;
  margin: 100px auto 0;
`;

const StDetailInfo = styled.section`
  display: flex;
  column-gap: 45px;
  max-width: 1000px;
  margin: 0 auto;
  justify-content: center;
`;

const StDetailImgWrapper = styled.div`
  max-width: 300px;
  width: 100%;
  > img {
    width: 100%;
  }
`;

const StSkeletonImageWrapper = styled(Skeleton.Image)`
  width: 100% !important;
  height: 100%;
  > svg {
    width: 100%;
    height: 100%;
  }
`;
export default React.memo(Detail);
