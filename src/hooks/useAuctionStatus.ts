import { Auction_post } from "../types/databaseRetrunTypes";
import { calculateAuctionStatusAndTime } from "../common/dayjs";
import { useEffect, useRef } from "react";
import { AuctionStatus } from "../types/detailTyps";
import { useAppDispatch } from "../redux/config/configStore";
import {
  selectorAuctionTimeStamp,
  setAuctionTimeStamp,
} from "../redux/modules/auctionTimestampSlice";
import { useSelector } from "react-redux";

type Parameter =
  | Pick<
      Auction_post,
      "auction_status" | "auction_end_date" | "auction_start_date"
    >
  | undefined;

const useAuctionStatus = (data: Parameter) => {
  const dispatch = useAppDispatch();
  const { auctionTimeStamp, auctionOver } = useSelector(
    selectorAuctionTimeStamp
  );
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateStatus = () => {
      const result = calculateAuctionStatusAndTime(
        data?.auction_start_date,
        data?.auction_end_date
      );

      // 조건부 업데이트
      if (result.auctionOver !== auctionOver) {
        dispatch(setAuctionTimeStamp(result));
      }

      if (
        result.auctionOver === AuctionStatus.START &&
        auctionTimeStamp !== result.auctionTimeStamp
      ) {
        dispatch(setAuctionTimeStamp(result));
      }
    };

    // 상태 업데이트 함수 호출
    updateStatus();

    // 1초마다 상태 업데이트
    intervalRef.current = setInterval(updateStatus, 1000);

    // 컴포넌트 언마운트시 인터벌 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [data, auctionOver, auctionTimeStamp]);

  return { auctionTimeStamp, auctionOver };
};

export default useAuctionStatus;
