import { Auction_post } from "../../types/databaseRetrunTypes";
import styled from "styled-components";
import {
  formatNumberWithCommas,
  formatProductStatus,
} from "../../common/formatUtil";
import { Spacer } from "../ui/Spacer";
import { ProductStatus, ShippingType } from "../../types/detailTyps";
import { transDate } from "../../common/dayjs";

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
      <StButton>입찰하기</StButton>
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

const StButton = styled.button`
  border: 1px solid rgba(0, 0, 0, 0);
  height: 40px;
  border-radius: 5px;
  color: white;
  background-color: black;
  transition: all 0.3s ease-in;
  cursor: pointer;
  &:hover {
    color: black;
    background-color: white;
    border-color: black;
  }
`;

export default DetailInfo;
