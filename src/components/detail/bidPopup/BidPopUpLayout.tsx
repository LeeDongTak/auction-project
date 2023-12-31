import { styled } from "styled-components";
import BidList from "./BidList";
import React from "react";
import CloseButton from "../../modalCloseButton/CloseButton";
import { AuctionStatus } from "../../../types/detailTyps";

interface Props {
  auctionId: string;
  forwardHandler: (e: React.MouseEvent<HTMLElement>) => void;
  auctionStatus: AuctionStatus;
}
const BidPopUpLayout = ({
  auctionId,
  forwardHandler,
  auctionStatus,
}: Props) => {
  return (
    <StBidLayoutWrapper>
      <div>
        <BidList auctionId={auctionId} auctionStatus={auctionStatus} />
        <CloseButton handler={forwardHandler} styleRight={5} />
      </div>
    </StBidLayoutWrapper>
  );
};

const StBidLayoutWrapper = styled.div`
  height: 400px;
  width: 400px;
  border-radius: 10px;
  position: fixed;
  bottom: 100px;
  right: 120px;
  z-index: 10;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  > div {
    overflow: scroll;
    position: relative;
    width: 100%;
    height: 100%;
    &::-webkit-scrollbar {
      width: unset;
    }
  }
`;

export default React.memo(BidPopUpLayout);
