import { styled } from "styled-components";
import { Spacer } from "../Spacer";
import {
  formatBidPriceByComma,
  formatNumberWithCommas,
} from "../../../common/formatUtil";
import { ChangeEvent, useState } from "react";

const BidCustomModal = () => {
  const [bidPriceState, setBidPriceState] = useState<string>("0");
  const onChangePriceHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setBidPriceState(formatBidPriceByComma(e.target.value));
  };

  return (
    <StCustomModalWrapper>
      <StCustomModalContentWrapper>
        <div>
          <h1>현재 최고 입찰가</h1>
          <span> ₩ {formatNumberWithCommas(1000000)}</span>
        </div>
        <Spacer y={70} />
        <StBidForm>
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
            <button>취소</button>
            <button>입찰하기</button>
          </StModalButtonWrapper>
        </StBidForm>
        <StCloseButton>X</StCloseButton>
      </StCustomModalContentWrapper>
    </StCustomModalWrapper>
  );
};
const StCustomModalWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: none;
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
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

const StCloseButton = styled.button`
  position: absolute;
  cursor: pointer;
  background-color: unset;
  border: unset;
  top: 10px;
  right: 10px;
  height: 20px;
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
