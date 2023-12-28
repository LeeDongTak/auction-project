import { styled } from "styled-components";
import { Spacer } from "../Spacer";
import {
  formatBidPriceByComma,
  formatNumberWithCommas,
} from "../../../common/formatUtil";
import React, { ChangeEvent, useState } from "react";
import { useAppDispatch } from "../../../redux/config/configStore";
import {
  closeBidCustomModal,
  selectorBidCustomModal,
} from "../../../redux/modules/bidCustomModalSlice";
import { useSelector } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";

const BidCustomModal = () => {
  const queryClient = useQueryClient();
  const [bidPriceState, setBidPriceState] = useState<string>("0");
  const dispatch = useAppDispatch();
  const { isOpen, maxBidPrice } = useSelector(selectorBidCustomModal);

  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPriceState(formatBidPriceByComma(e.target.value));
  };

  const onClickCloseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeBidCustomModal());
    }
  };

  const onSubmitBidHandler = (e: React.FormEvent<unknown>) => {
    e.preventDefault();
    queryClient.invalidateQueries({ queryKey: ["getBidMaxPrice"] });
    console.log("maxBidPrice in submit ", maxBidPrice);
  };

  return (
    <StCustomModalWrapper onClick={onClickCloseModalHandler} $isOpen={isOpen}>
      <StCustomModalContentWrapper>
        <div>
          <h1>현재 최고 입찰가</h1>
          <span> ₩ {formatNumberWithCommas(maxBidPrice)}</span>
        </div>
        <Spacer y={70} />
        <StBidForm onSubmit={onSubmitBidHandler}>
          <label htmlFor="bid_price">
            <input
              type="text"
              id="bid_price"
              value={bidPriceState}
              onChange={onChangePriceHandler}
            />
          </label>
          <Spacer y={40} />
          <StModalButtonWrapper>
            <button type="button" onClick={onClickCloseModalHandler}>
              취소
            </button>
            <button type="submit">입찰하기</button>
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
  opacity: ${({ $isOpen }) => ($isOpen ? "10" : "0")};
  z-index: ${({ $isOpen }) => ($isOpen ? "10" : "-1")};
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
  > label {
    width: 100%;
    position: relative;
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
  }
  > label > input {
    outline: none;
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

const StModalButtonWrapper = styled.div`
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
    background-color: #bdc3c7;
    color: white;
    &:hover {
      background-color: black;
    }
  }
`;

export default BidCustomModal;
