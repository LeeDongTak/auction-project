export enum ShippingType {
  DIRECT,
  SHIPPING,
}

export enum ProductStatus {
  S, //최상
  A, // 상
  B, // 중
  C, // 하
}

export enum AuctionStatus {
  READY,
  START,
  END,
}

export type TimeUntil = {
  auctionTimeStamp: string;
  auctionOver: AuctionStatus;
};
