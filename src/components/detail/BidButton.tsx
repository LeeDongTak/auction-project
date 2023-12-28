import { formatAuctionStatusByButton } from "../../common/formatUtil";
import { AuctionStatus } from "../../types/detailTyps";
import { styled } from "styled-components";
import { selectorAuctionTimeStamp } from "../../redux/modules/auctionTimestampSlice";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/config/configStore";
import { openBidCustomModal } from "../../redux/modules/bidCustomModalSlice";

const BidButton = () => {
  const dispatch = useAppDispatch();
  const { auctionTimeStamp, auctionOver } = useSelector(
    selectorAuctionTimeStamp
  );

  const onClickBidCustomModalOpenHandler = () => {
    dispatch(openBidCustomModal());
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
