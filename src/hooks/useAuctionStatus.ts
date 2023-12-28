import { Auction_post } from "../types/databaseRetrunTypes";
import { calculateAuctionStatusAndTime } from "../common/dayjs";
import { useEffect, useRef, useState } from "react";
import { AuctionStatus } from "../types/detailTyps";

type Parameter =
  | Pick<
      Auction_post,
      "auction_status" | "auction_end_date" | "auction_start_date"
    >
  | undefined;

const useAuctionStatus = (data: Parameter) => {
  const [auctionTimeStamp, setAuctionTimeStamp] = useState<string>();
  const [auctionOver, setAuctionOver] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateStatus = () => {
      const result = calculateAuctionStatusAndTime(
        data?.auction_start_date,
        data?.auction_end_date
      );

      // 조건부 업데이트
      if (result.isOver !== auctionOver) {
        setAuctionOver(result.isOver);
      }

      if (
        result.isOver === AuctionStatus.START &&
        auctionTimeStamp !== result.message
      ) {
        setAuctionTimeStamp(result.message);
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
