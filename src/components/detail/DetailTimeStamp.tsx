import { styled } from "styled-components";
import { Spacer } from "../ui/Spacer";
import { AuctionStatus } from "../../types/detailTyps";
import { useSelector } from "react-redux";
import { selectorAuctionTimeStamp } from "../../redux/modules/auctionTimestampSlice";

const DetailTimeStamp = () => {
  const { auctionOver, auctionTimeStamp } = useSelector(
    selectorAuctionTimeStamp
  );

  return (
    <StTimeStampWrapper>
      {auctionOver === AuctionStatus.READY && (
        <div>
          <h2>경매가 준비중입니다.</h2>
        </div>
      )}
      {auctionOver === AuctionStatus.END && (
        <div>
          {/* 경매 종료 시 낙찰자 출력 또는 불발 표시*/}
          <h2>경매가 종료되었습니다.</h2>
          {/* 경매 종료 시 낙찰자 출력 또는 불발 표시*/}
        </div>
      )}

      {auctionOver === AuctionStatus.START && (
        <div>
          <h2>경매 남은시간</h2>
          <Spacer y={20} />
          <span>{auctionTimeStamp}</span>
        </div>
      )}
    </StTimeStampWrapper>
  );
};

const StTimeStampWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
  text-align: center;
  h2 {
    font-size: 30px;
  }
  span {
    font-size: 24px;
  }
`;
export default DetailTimeStamp;
