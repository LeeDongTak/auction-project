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
      <StBidCardUserInfo $cardIndex={cardIndex}>
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
  padding: 10px 0;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StBidCardUserInfo = styled.div<{ $cardIndex: number }>`
  display: flex;
  gap: 10px;
  color: ${({ $cardIndex }) =>
    $cardIndex === 0 ? "var(--main-color)" : "black"};

  font-size: ${({ $cardIndex }) => ($cardIndex === 0 ? "20" : "16")}px;
  font-weight: bold;

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
