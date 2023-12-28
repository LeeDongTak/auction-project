import { AuctionStatus, ProductStatus } from "../types/detailTyps";

export function formatNumberWithCommas(number: number = 0) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatProductStatus(status: ProductStatus) {
  switch (status) {
    case ProductStatus.S:
      return "최상";
    case ProductStatus.A:
      return "상";
    case ProductStatus.B:
      return "중";
    default:
      return "하";
  }
}

export function formatAuctionStatusByButton(status: AuctionStatus) {
  switch (status) {
    case AuctionStatus.READY:
      return "경매 준비";
    case AuctionStatus.END:
      return "경매 종료";
    default:
      return "입찰하기";
  }
}

export function formatBidPriceByComma(price: number | string = 0) {
  // 숫자와 쉼표를 제외한 모든 문자를 제거
  const onlyNumbersAndCommas = String(price).replace(/[^\d,]/g, "");

  // 제일 앞이 0이면 0 삭제
  const withoutLeadingZeros = onlyNumbersAndCommas.replace(/^0+/, "");

  return withoutLeadingZeros
    .replace(/,/g, "") // 먼저 기존의 쉼표를 모두 제거
    .replace(/\B(?=(\d{3})+(?!\d))/g, ","); // 새로운 포맷 적용
}
