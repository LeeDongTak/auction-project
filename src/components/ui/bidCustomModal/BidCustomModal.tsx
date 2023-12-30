import { styled } from "styled-components";
import { Spacer } from "../Spacer";
import {
  formatBidPriceByComma,
  formatNumberWithCommas,
} from "../../../common/formatUtil";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useAppDispatch } from "../../../redux/config/configStore";
import {
  closeBidCustomModal,
  selectorBidCustomModal,
} from "../../../redux/modules/bidCustomModalSlice";
import { useSelector } from "react-redux";
import { selectorAuctionTimeStamp } from "../../../redux/modules/auctionTimestampSlice";
import DetailTimeStamp from "../../detail/DetailTimeStamp";
import CloseButton from "../CloseButton";
import BidForm from "./bidForm/BidForm";

export type BidCondition = 0 | 1;

const BidCustomModal = () => {
  const [bidPriceState, setBidPriceState] = useState<string>("0");
  const dispatch = useAppDispatch();
  const { isOpen, maxBid, lowerPrice } = useSelector(selectorBidCustomModal);
  const { auctionOver } = useSelector(selectorAuctionTimeStamp);
  const bidInputRef = useRef<HTMLInputElement>(null);

  const [bidCondition, setBidCondition] = useState<BidCondition>(1);

  useEffect(() => {
    const bidPrice = bidPriceState.replaceAll(",", "");
    const minBidPrice = maxBid?.bid_price || lowerPrice;
    if (Number(bidPrice) !== 0) {
      if (bidPriceState && minBidPrice) {
        Number(bidPrice) <= minBidPrice
          ? setBidCondition(0)
          : bidCondition !== 1 && setBidCondition(1);
      }
    } else setBidCondition(1);
  }, [maxBid?.bid_price, bidPriceState]);

  useEffect(() => {
    bidInputRef.current?.focus();
    return () => {
      setBidPriceState("0");
      setBidCondition(1);
    };
  }, []);

  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPriceState(formatBidPriceByComma(e.target.value));
  };

  const onClickCloseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeBidCustomModal());
    }
  };

  return (
    <StCustomModalWrapper onClick={onClickCloseModalHandler} $isOpen={isOpen}>
      <StCustomModalContentWrapper>
        <DetailTimeStamp />
        <Spacer y={40} />
        <div>
          <h1>시작 입찰가</h1>
          <span> ₩ {formatNumberWithCommas(lowerPrice)}</span>
        </div>
        <Spacer y={20} />
        <div>
          <h1>현재 최고 입찰가</h1>
          <span> ₩ {formatNumberWithCommas(maxBid?.bid_price)}</span>
        </div>
        <Spacer y={40} />
        <BidForm
          $isOver={auctionOver}
          $isCondition={bidCondition}
          value={bidPriceState}
          onChange={onChangePriceHandler}
          forwardRef={bidInputRef}
          onClick={onClickCloseModalHandler}
          setBidCondition={setBidCondition}
        />
        <CloseButton handler={onClickCloseModalHandler} />
      </StCustomModalContentWrapper>
    </StCustomModalWrapper>
  );
};
const StCustomModalWrapper = styled.div<{ $isOpen: boolean }>`
  height: 100%;
  width: 100%;
  display: flex;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 0.2s ease-in;
  z-index: 10;
`;

const StCustomModalContentWrapper = styled.div`
  position: relative;
  width: 600px;
  height: 450px;
  margin: auto;
  border-radius: 15px;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  > div {
    display: flex;
    justify-content: center;
    gap: 10px;
    > h1 {
      display: inline-block;
    }
    > h1,
    span {
      font-weight: bold;
      font-size: 24px;
    }
    > span {
      font-size: 30px;
    }
  }
`;

export default BidCustomModal;
