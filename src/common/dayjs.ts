import dayjs from "dayjs";
import { AuctionStatus } from "../types/detailTyps";

type TimeUntilReturn = {
  message: string;
  isOver: AuctionStatus.START | AuctionStatus.END;
};

export function transDate(date: Date | string) {
  return dayjs(date).format("YYYY. MM. DD");
}

export function calculateAuctionStatusAndTime(
  auctionStartDate: Date | string | undefined,
  auctionEndDate: Date | string | undefined
): TimeUntilReturn {
  const result = {
    message: "",
    isOver: AuctionStatus.START | AuctionStatus.END | AuctionStatus.READY,
  };

  const now = dayjs();
  const startDate = dayjs(auctionStartDate);
  const endDate = dayjs(auctionEndDate);

  // 경매가 아직 시작되지 않았을 경우
  if (now.isBefore(startDate)) {
    result.isOver = AuctionStatus.READY;
    return result;
  }

  // 경매가 종료된 경우
  if (now.isAfter(endDate)) {
    result.message = "경매가 종료되었습니다.";
    result.isOver = AuctionStatus.END;
    return result;
  }

  // 경매가 진행 중일 경우, 남은 시간 계산
  const diff = endDate.diff(now);
  const days = Math.floor(diff / (24 * 60 * 60 * 1000));
  const hours = Math.floor((diff % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const minutes = Math.floor((diff % (60 * 60 * 1000)) / (60 * 1000));
  const seconds = Math.floor((diff % (60 * 1000)) / 1000);

  result.message = `${days}일 ${hours}시간 ${minutes}분 ${seconds}초 남음`;
  result.isOver = AuctionStatus.START;

  return result;
}
