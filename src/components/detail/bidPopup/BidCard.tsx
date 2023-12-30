import { Bids } from "../../../types/databaseRetrunTypes";
import { styled } from "styled-components";
import { formatNumberWithCommas } from "../../../common/formatUtil";

interface Props {
  bidData: Bids;
  cardIndex: number;
}

export function BidCard({ bidData, cardIndex }: Props) {
  return (
    <StBidCardWrapper>
      <StBidCardUserInfo>
        <span>{cardIndex + 1}.</span>
        <h1>
          {bidData.user_info?.nickname} (
          {bidData.user_info?.user_email.split("@")[0]})
        </h1>
        <span>₩ {formatNumberWithCommas(bidData?.bid_price)}</span>
      </StBidCardUserInfo>
    </StBidCardWrapper>
  );
}
const StBidCardWrapper = styled.article`
  width: 100%;
  font-size: 16px;
  font-weight: bold;
`;

const StBidCardUserInfo = styled.div`
  display: flex;
  gap: 10px;
  > span:first-child {
    flex: 0.5;
    text-align: right;
  }
  > h1 {
    flex: 2;
  }
  > span:last-child {
    flex: 2;
  }
`;
