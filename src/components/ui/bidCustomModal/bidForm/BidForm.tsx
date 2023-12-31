import React from "react";
import { useSelector } from "react-redux";
import { styled } from "styled-components";
import { fetchPostAuctionBid } from "../../../../api/bid";
import { formatAuctionStatusByButton } from "../../../../common/formatUtil";
import { useCustomModal } from "../../../../hooks/useCustomModal";
import { useCustomMutation } from "../../../../hooks/useCustomMutation";
import { useAppDispatch } from "../../../../redux/config/configStore";
import { selectorAuctionTimeStamp } from "../../../../redux/modules/auctionTimestampSlice";
import {
  closeBidCustomModal,
  selectorBidCustomModal,
} from "../../../../redux/modules/bidCustomModalSlice";
import { AuctionStatus } from "../../../../types/detailTyps";
import { Spacer } from "../../Spacer";
import { BidCondition } from "../BidCustomModal";
import useGetAuthInfo from "../../../../hooks/useGetAuthInfo";

const BidForm = (props: {
  $isOver: any;
  $isCondition: 0 | 1;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  forwardRef: React.RefObject<HTMLInputElement>;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  setBidCondition: React.Dispatch<React.SetStateAction<0 | 1>>;
}) => {
  const {
    $isOver,
    $isCondition,
    value,
    onChange,
    forwardRef,
    onClick,
    setBidCondition,
  } = props;

  const dispatch = useAppDispatch();
  const { handleOpenCustomModal } = useCustomModal();

  const { user: userData } = useGetAuthInfo();

  const { auctionOver } = useSelector(selectorAuctionTimeStamp);
  const postBidMutationOptions = {
    mutationFn: fetchPostAuctionBid,
    onSuccess: async () => {
      await handleOpenCustomModal("입찰 완료!", "alert");
      dispatch(closeBidCustomModal());
    },
  };

  const mutation = useCustomMutation(postBidMutationOptions);
  const { maxBid, lowerPrice, auction_id } = useSelector(
    selectorBidCustomModal
  );

  const onSubmitBidHandler = async (e: React.FormEvent<unknown>) => {
    const maxBidPrice = maxBid?.bid_price || lowerPrice;
    e.preventDefault();
    const bidPrice = value.replaceAll(",", "");

    if (auctionOver === AuctionStatus.END) {
      await handleOpenCustomModal("경매가 종료되었습니다.", "alert");
      return;
    }

    if (Number(bidPrice) <= 0) {
      await handleOpenCustomModal("0이상의 값을 입력하세요.", "alert");
      setBidCondition(0);
      forwardRef.current?.focus();
      return;
    }

    if (typeof maxBidPrice === "number" && maxBidPrice >= 0) {
      if (maxBidPrice >= Number(bidPrice)) {
        setBidCondition(0);
        forwardRef.current?.focus();
        return;
      }

      const modalMessage = `₩ ${value}에 \n 입찰하시겠습니까?`;
      if (await handleOpenCustomModal(modalMessage, "confirm")) {
        const user_id = userData.id;

        if (auction_id) {
          const newBid = {
            auction_id,
            user_id,
            bid_price: Number(bidPrice),
          };
          // insert 종료
          mutation(newBid);
        }
      }
    }
  };

  return (
    <StBidForm onSubmit={onSubmitBidHandler}>
      <StBidInputLabel
        htmlFor="bid_price"
        $isOver={$isOver}
        $isCondition={$isCondition}
      >
        <input
          type="text"
          id="bid_price"
          value={value}
          onChange={onChange}
          ref={forwardRef}
          readOnly={$isOver === AuctionStatus.END}
        />
      </StBidInputLabel>
      <Spacer y={40} />
      <StModalButtonWrapper $isOver={$isOver} $isCondition={$isCondition}>
        <button type="button" onClick={onClick}>
          취소
        </button>
        <button type="submit">{formatAuctionStatusByButton($isOver)}</button>
      </StModalButtonWrapper>
    </StBidForm>
  );
};

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
    background-color: #e84118;
    color: white;
    &:hover {
      background-color: #f5b7b1;
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
export default React.memo(BidForm);
