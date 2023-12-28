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
import { Auction_post } from "../types/databaseRetrunTypes";

const Detail = () => {
  const { auctionId } = useParams();
  const queryAuctionOptions = {
    queryKey: ["getAuction"],
    queryFn: () => fetchGetAuctionById(auctionId!),
    queryOptions: { staleTime: Infinity },
  };

  const data = useCustomQuery<Auction_post, Error>(queryAuctionOptions);
  const thumbnailImg = data?.auction_images?.[0]?.image_path ?? placeholder;

  useAuctionStatus(data);

  return (
    <StDetailWrapper>
      <StDetailInfo>
        <StDetailImgWrapper>
          <img src={thumbnailImg} alt={data?.title} />
        </StDetailImgWrapper>
        <DetailInfo auctionData={data} />
      </StDetailInfo>
      <Spacer y={40} />
      <DetailTimeStamp />
      <Spacer y={20} />
      <DetailContent auctionContent={data?.content} />
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
  margin: 0 auto;
  justify-content: center;
`;

const StDetailImgWrapper = styled.div`
  max-width: 300px;
  > img {
    width: 100%;
  }
`;

export default React.memo(Detail);
