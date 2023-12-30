import { formatAuctionStatusByButton } from "../../common/formatUtil";
import { AuctionStatus } from "../../types/detailTyps";
import { styled } from "styled-components";
import { selectorAuctionTimeStamp } from "../../redux/modules/auctionTimestampSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/config/configStore";
import {
  openBidCustomModal,
  selectorBidCustomModal,
} from "../../redux/modules/bidCustomModalSlice";
import { useEffect } from "react";
import { Auction_post, MaxBids } from "../../types/databaseRetrunTypes";

type Props = {
  auctionData: Auction_post | undefined;
  maxBid: MaxBids | undefined;
};
const BidButton = ({ maxBid, auctionData }: Props) => {
  const dispatch = useAppDispatch();
  const { isOpen } = useSelector(selectorBidCustomModal);
  const { auctionOver } = useSelector(selectorAuctionTimeStamp);

  useEffect(() => {
    if (isOpen) {
      const bidData = {
        maxBid: maxBid,
        auction_id: auctionData?.auction_id,
      };
      dispatch(openBidCustomModal(bidData));
    }
  }, [maxBid]);

  const onClickBidCustomModalOpenHandler = () => {
    const bidData = {
      maxBid,
      auction_id: auctionData?.auction_id,
      minBid: auctionData?.lower_limit,
    };
    dispatch(openBidCustomModal(bidData));
  };

  return (
    <StButton $isOver={auctionOver} onClick={onClickBidCustomModalOpenHandler}>
      {formatAuctionStatusByButton(auctionOver)}
    </StButton>
  );
};

const StButton = styled.button<{ $isOver: AuctionStatus }>`
  border: 1px solid rgba(0, 0, 0, 0);
  height: 40px;
  border-radius: 5px;
  color: white;
  transition: all 0.3s ease-in;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;

  pointer-events: ${({ $isOver }) =>
    $isOver !== AuctionStatus.START ? "none" : "auto"};
  background-color: ${({ $isOver }) => {
    switch ($isOver) {
      case AuctionStatus.END:
        return "#e84118";
      case AuctionStatus.READY:
        return "#dcdde1";
      default:
        return "black";
    }
  }};
  &:hover {
    color: black;
    background-color: white;
    border-color: black;
  }
`;
export default BidButton;
