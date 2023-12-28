import { Auction_post } from "../../types/databaseRetrunTypes";
import styled from "styled-components";
import {
  formatNumberWithCommas,
  formatProductStatus,
} from "../../common/formatUtil";
import { Spacer } from "../ui/Spacer";
import { ShippingType } from "../../types/detailTyps";
import { transDate } from "../../common/dayjs";
import BidButton from "./BidButton";
import React from "react";

type Props = {
  auctionData: Auction_post | undefined;
};

/*
 ? 경매품 출품자에게 상한가를 받는 것은 이해가 가나,
 ? 그걸 입찰자들에게 보여주어야 할 이유가 있을까 싶습니다.
 ? 보여주지 않고, "입찰가가 출품자의 희망낙찰가보다 높을 경우 그 즉시 경매가 종료되고 낙찰이 이루어집니다" 정도로 처리하는 건 어떨까요?
 ? 출품자 입장에서는 자신의 희망낙찰가보다 더 높은 입찰액이 들어오면 더 좋을텐데, 굳이 그걸 막을 이유가 없겠다 싶어서 의견 남겨봅니다 ㅎㅎ.
*/

const SPACER_HEIGHT = 10;
const SPACER_LITERARY = 20;
const DetailInfo = ({ auctionData }: Props) => {
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
          <span>경매 시작 날짜 : </span>
          <span>{transDate(auctionData?.auction_end_date!)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>시작가격 : </span>
          <span> ₩ {formatNumberWithCommas(auctionData?.upper_limit)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>입찰가격 : </span>
          <span> ₩ {formatNumberWithCommas(auctionData?.upper_limit)}</span>
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

      {/* 경매 시작 전, 진행, 경매 종료 */}
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
