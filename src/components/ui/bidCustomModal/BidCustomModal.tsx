import { styled } from "styled-components";
import { Spacer } from "../Spacer";
import {
  formatAuctionStatusByButton,
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
import { useQueryClient } from "@tanstack/react-query";
import { selectorAuctionTimeStamp } from "../../../redux/modules/auctionTimestampSlice";
import { AuctionStatus } from "../../../types/detailTyps";
import DetailTimeStamp from "../../detail/DetailTimeStamp";

type BidCondition = 0 | 1;

const BidCustomModal = () => {
  const queryClient = useQueryClient();
  const [bidPriceState, setBidPriceState] = useState<string>("0");
  const dispatch = useAppDispatch();
  const { isOpen, maxBidPrice } = useSelector(selectorBidCustomModal);
  const { auctionOver } = useSelector(selectorAuctionTimeStamp);
  const bidInputRef = useRef<HTMLInputElement>(null);

  const [bidCondition, setBidCondition] = useState<BidCondition>(1);

  useEffect(() => {
    const bidPrice = bidPriceState.replaceAll(",", "");
    if (Number(bidPrice) !== 0) {
      if (bidPriceState && maxBidPrice) {
        Number(bidPrice) <= maxBidPrice
          ? setBidCondition(0)
          : bidCondition !== 1 && setBidCondition(1);
      }
    } else setBidCondition(1);
  }, [maxBidPrice, bidPriceState]);

  useEffect(() => {
    bidInputRef.current?.focus();
    return () => {
      setBidPriceState("0");
      setBidCondition(1);
    };
  }, []);

  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const price = e.target.value;

    setBidPriceState(formatBidPriceByComma(e.target.value));
  };

  const onClickCloseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeBidCustomModal());
    }
  };

  const onSubmitBidHandler = (e: React.FormEvent<unknown>) => {
    e.preventDefault();
    const bidPrice = bidPriceState.replaceAll(",", "");

    if (Number(bidPrice) <= 0) {
      setBidCondition(0);
      bidInputRef.current?.focus();
      return;
    }

    // 경매 입찰가와 새로 refatch한 maxBidPrice를 비교한다.
    if (maxBidPrice) {
      if (maxBidPrice >= Number(bidPrice)) {
        setBidCondition(0);
        bidInputRef.current?.focus();
        return;
      }
    }

    // 만약 maxBidPrice가 더 크다면 입력을 막는다.
    // 그렇지 않다면 입력을 실행한다.
  };
  return (
    <StCustomModalWrapper onClick={onClickCloseModalHandler} $isOpen={isOpen}>
      <StCustomModalContentWrapper>
        <DetailTimeStamp />
        <Spacer y={40} />
        <div>
          <h1>현재 최고 입찰가</h1>
          <span> ₩ {formatNumberWithCommas(maxBidPrice)}</span>
        </div>
        <Spacer y={40} />
        <StBidForm onSubmit={onSubmitBidHandler}>
          <StBidInputLabel
            htmlFor="bid_price"
            $isOver={auctionOver}
            $isCondition={bidCondition}
          >
            <input
              type="text"
              id="bid_price"
              value={bidPriceState}
              onChange={onChangePriceHandler}
              ref={bidInputRef}
              readOnly={auctionOver === AuctionStatus.END}
            />
          </StBidInputLabel>
          <Spacer y={40} />
          <StModalButtonWrapper
            $isOver={auctionOver}
            $isCondition={bidCondition}
          >
            <button type="button" onClick={onClickCloseModalHandler}>
              취소
            </button>
            <button type="submit">
              {formatAuctionStatusByButton(auctionOver)}
            </button>
          </StModalButtonWrapper>
        </StBidForm>
        <StCloseButton>
          <div>
            <button onClick={onClickCloseModalHandler}></button>
          </div>
        </StCloseButton>
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
  height: 400px;
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

const StBidForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
  width: 100%;
`;

const StBidInputLabel = styled.label<{
  $isOver: AuctionStatus;
  $isCondition: BidCondition;
}>`
  position: relative;

  opacity: ${({ $isOver }) => ($isOver === AuctionStatus.END ? "0.5" : "1")};

  &::after {
    color: #e84118;
    content: "최고 경매가 보다 낮습니다.";
    bottom: -20px;
    position: absolute;
    left: 0;
    font-size: 1.4rem;
    display: ${({ $isCondition }) => ($isCondition ? "none" : "block")};
  }

  &::before {
    content: "₩ ";
    position: absolute;
    top: 50%;
    transform: translateY(-45%);
    left: 10px;
    z-index: 200;
    font-size: 24px;
    font-weight: bold;
  }
  > input {
    outline: none;
    border: 1px solid
      ${({ $isCondition }) => ($isCondition ? "black" : "#e84118")};
    padding: 10px 10px;
    width: 100%;
    text-align: right;
    font-size: 24px;
  }
`;

const StCloseButton = styled.div`
  position: absolute;
  cursor: pointer;
  background-color: unset;
  border: unset;
  top: 15px;
  right: 15px;
  height: 20px;
  > div {
    position: relative;
    > button {
      cursor: pointer;
      background-color: unset;
      border: unset;
      width: 40px;
      height: 40px;
    }
    > button::after,
    > button::before {
      position: absolute;
      left: 50%;
      top: 50%;
      will-change: transform, margin-top;
      transition-property: transform, margin-top;
      transition-duration: 300ms;
      transition-timing-function: ease-out;
      content: "";
      width: 2rem;
      height: 0.3rem;
      z-index: 10;
      background-color: black;
    }
    > button:after {
      transform: translate(-50%, -50%) rotateZ(-45deg);
    }
    > button:before {
      transform: translate(-50%, -50%) rotateZ(45deg);
    }
    > button:hover:after {
      transform: translate(-50%, -50%) rotateZ(45deg);
      background-color: black;
    }
    > button:hover:before {
      transform: translate(-50%, -50%) rotateZ(-45deg);
      background-color: black;
    }
  }
`;

const StModalButtonWrapper = styled.div<{
  $isOver: AuctionStatus;
  $isCondition: BidCondition;
}>`
  display: flex;
  width: 100%;
  justify-content: center;
  gap: 20px;
  > button {
    outline: none;
    padding: 10px 0;
    border: unset;
    border-radius: 5px;
    cursor: pointer;
    width: 100px;
    font-size: 16px;
    font-weight: bold;
    transition: all 0.2s ease-in;
  }
  > button:first-child {
    background-color: #f5b7b1;
    color: white;
    &:hover {
      background-color: #e84118;
    }
  }
  > button:last-child {
    color: white;

    pointer-events: ${({ $isOver, $isCondition }) => {
      if ($isOver !== AuctionStatus.START || !$isCondition) return "none";
      else return "auto";
    }};

    background-color: ${({ $isOver, $isCondition }) => {
      // $isCondition이 false이거나 $isOver가 AuctionStatus.END일 때
      if (!$isCondition || $isOver === AuctionStatus.END) {
        return "#e84118"; // 동일한 색상 반환
      }

      switch ($isOver) {
        case AuctionStatus.READY:
          return "#dcdde1"; // 경매 준비 중인 경우의 색상
        default:
          return "black"; // 기본 색상
      }
    }};

    &:hover {
      background-color: #bdc3c7;
    }
  }
`;

export default BidCustomModal;
