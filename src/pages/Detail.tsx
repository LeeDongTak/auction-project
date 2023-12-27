import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useCustomQuery } from "../hooks/useCustomQuery";
import { fetchGetAuctionById } from "../api/auction";
import { Auction_post } from "../types/databaseRetrunTypes";
import placeholder from "../images/placeholder.svg";
import DetailInfo from "../components/detail/DetailInfo";

const Detail = () => {
  const { auctionId } = useParams();
  const queryOptions = {
    queryKey: ["getAuction"],
    queryFn: () => fetchGetAuctionById(auctionId!),
    queryOptions: { staleTime: Infinity },
  };
  const data = useCustomQuery<Auction_post, Error>(queryOptions);

  const thumbnailImg = data?.auction_images?.[0]?.image_path ?? placeholder;

  return (
    <StDetailWrapper>
      <StDetailInfo>
        <StDetailImgWrapper>
          <img src={thumbnailImg} alt={data?.title} />
        </StDetailImgWrapper>
        <DetailInfo auctionData={data} />
      </StDetailInfo>
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
  column-gap: 20px;
  margin: 0 auto;
  justify-content: center;
`;

const StDetailImgWrapper = styled.div`
  max-width: 300px;
  > img {
    width: 100%;
  }
`;

export default Detail;
