import { styled } from "styled-components";
import BidList from "./BidList";
import React from "react";
import Title from "./Title";
import CloseButton from "../../ui/CloseButton";

interface Props {
  auctionId: string;
}
const BidPopUpLayout = ({ auctionId }: Props) => {
  const OnClickCloseButtonHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
    }
  };
  return (
    <StBidLayoutWrapper>
      <div>
        <Title title={"입찰 현황"} />
        <BidList auctionId={auctionId} />
        <CloseButton handler={OnClickCloseButtonHandler} />
      </div>
    </StBidLayoutWrapper>
  );
};

const StBidLayoutWrapper = styled.div`
  height: 400px;
  width: 400px;
  border-radius: 10px;
  position: fixed;
  bottom: 50px;
  right: 60px;
  z-index: 10;
  background-color: white;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

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
