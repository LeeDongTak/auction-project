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
import { useQueryClient } from "@tanstack/react-query";
import { fetchPatchAuctionPost } from "../api/auction";
import { useCustomMutation } from "./useCustomMutation";
import { selectorAuctionSingleData } from "../redux/modules/auctionSingleDataSlice";

const useAuctionStatus = () => {
  const { auctionData } = useSelector(selectorAuctionSingleData);
  const queryClient = useQueryClient();

  // bid 상태 update
  const auctionPostUpdateMutationOptions = {
    mutationFn: fetchPatchAuctionPost,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["getAuction"] });
    },
  };

  const mutation = useCustomMutation(auctionPostUpdateMutationOptions);

  const dispatch = useAppDispatch();
  const { auctionTimeStamp, auctionOver } = useSelector(
    selectorAuctionTimeStamp
  );
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const updateStatus = () => {
      const result = calculateAuctionStatusAndTime(
        auctionData?.auction_start_date,
        auctionData?.auction_end_date
      );

      // auction db의 status값이 변경되는 상태값과 다르다면 patch 진행
      if (auctionData?.auction_id) {
        if (auctionData?.auction_status !== String(result.auctionOver)) {
          const updateAuctionPost: Pick<
            Auction_post,
            "auction_id" | "auction_status"
          > = {
            auction_id: auctionData?.auction_id,
            auction_status: auctionData?.auction_status,
          };

          updateAuctionPost.auction_status = String(result.auctionOver);
          // auction db의 status값이 변경되는 상태값과 다르다면 patch 진행
          if (auctionData.auction_status !== updateAuctionPost.auction_status) {
            mutation(updateAuctionPost);
          }
        }
      }
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

    // 경매가 종료 되지않았다면
    if (auctionData?.auction_status !== String(AuctionStatus.END)) {
      // 상태 업데이트 함수 호출
      updateStatus();

      // 1초마다 상태 업데이트
      intervalRef.current = setInterval(updateStatus, 1000);
    } else {
      dispatch(
        setAuctionTimeStamp({
          auctionOver: AuctionStatus.END,
          auctionTimeStamp: "경매가 종료되었습니다.",
        })
      );
    }

    // 컴포넌트 언마운트시 인터벌 정리
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [auctionData, auctionOver, auctionTimeStamp]);

  return { auctionTimeStamp, auctionOver };
};

export default useAuctionStatus;
