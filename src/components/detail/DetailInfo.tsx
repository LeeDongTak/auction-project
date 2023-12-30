import React from "react";
import styled from "styled-components";
import { transDate } from "../../common/dayjs";
import {
  formatNumberWithCommas,
  formatProductStatus,
} from "../../common/formatUtil";
import { Auction_post } from "../../types/databaseRetrunTypes";
import { ShippingType } from "../../types/detailTyps";
import { Spacer } from "../ui/Spacer";
import BidButton from "./BidButton";
import { useSelector } from "react-redux";
import { selectorBidCustomModal } from "../../redux/modules/bidCustomModalSlice";

type Props = {
  auctionData: Auction_post | undefined;
};

const SPACER_HEIGHT = 10;
const SPACER_LITERARY = 20;
const DetailInfo = ({ auctionData }: Props) => {
  const { maxBid } = useSelector(selectorBidCustomModal);

  return (
    <StDetailInfoWrapper>
      <div>
        <h1>{auctionData?.title}</h1>
        <span>{transDate(auctionData?.created_at!)}</span>
      </div>
      <Spacer y={SPACER_LITERARY} />
      <StAuctionInfo>
        <li>
          <span>경매 시작 날짜 : </span>
          <span>{transDate(auctionData?.auction_start_date!)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>경매 마감 날짜 : </span>
          <span>{transDate(auctionData?.auction_end_date!)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>시작가격 : </span>
          <span> ₩ {formatNumberWithCommas(auctionData?.lower_limit)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>입찰가격 : </span>
          <span> ₩ {formatNumberWithCommas(maxBid?.bid_price || 0)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
      </StAuctionInfo>
      <Spacer y={SPACER_LITERARY} />
      <StAuctionStatusWrapper>
        <span>배송정보 : </span>
        <span>
          {Number(auctionData?.shipping_type) === ShippingType.DIRECT
            ? "직거래"
            : "택배거래"}
        </span>
      </StAuctionStatusWrapper>
      <Spacer y={SPACER_LITERARY} />
      <StAuctionStatusWrapper>
        <span>상품상태 : </span>
        <span>{formatProductStatus(Number(auctionData?.product_status))}</span>
      </StAuctionStatusWrapper>
      <Spacer y={SPACER_LITERARY} />

      <BidButton />
    </StDetailInfoWrapper>
  );
};

const StDetailInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;

  > div:first-child {
    display: flex;
    flex-direction: column;
    row-gap: 10px;

    > h1 {
      font-size: 24px;
      font-weight: 700;
    }

    > span {
      font-size: 14px;
    }
  }
`;

const StAuctionInfo = styled.ul`
  font-size: 16px;

  > li > span {
    font-weight: 700;
  }
`;

const StAuctionStatusWrapper = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

export default React.memo(DetailInfo);
