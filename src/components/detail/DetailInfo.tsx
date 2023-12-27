import { Auction_post } from "../../types/databaseRetrunTypes";
import styled from "styled-components";
import { formatNumberWithCommas } from "../../common/formatNumber";
import transDate from "../../common/dayjs";

type Props = {
  auctionData: Auction_post | undefined;
};

/*
 ? 경매품 출품자에게 상한가를 받는 것은 이해가 가나,
 ? 그걸 입찰자들에게 보여주어야 할 이유가 있을까 싶습니다.
 ? 보여주지 않고, "입찰가가 출품자의 희망낙찰가보다 높을 경우 그 즉시 경매가 종료되고 낙찰이 이루어집니다" 정도로 처리하는 건 어떨까요?
 ? 출품자 입장에서는 자신의 희망낙찰가보다 더 높은 입찰액이 들어오면 더 좋을텐데, 굳이 그걸 막을 이유가 없겠다 싶어서 의견 남겨봅니다 ㅎㅎ.
*/

const DetailInfo = ({ auctionData }: Props) => {
  console.log(auctionData);
  return (
    <StDetailInfoWrapper>
      <div>
        <h1>{auctionData?.title}</h1>
        <span>{transDate(auctionData?.created_at!)}</span>
      </div>
      <ul>
        <li>
          <span>경매 시작 날짜 :</span>
          <span>{transDate(auctionData?.auction_start_date!)}</span>
        </li>
        <li>
          <span>경매 시작 날짜 :</span>
          <span>{transDate(auctionData?.auction_end_date!)}</span>
        </li>
        <li>
          <span>시작가격 : </span>
          <span>{formatNumberWithCommas(auctionData?.upper_limit)}</span>
        </li>
      </ul>
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

export default DetailInfo;
