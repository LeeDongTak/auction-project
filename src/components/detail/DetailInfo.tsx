import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import styled from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { transDate } from "../../common/dayjs";
import {
  formatNumberWithCommas,
  formatProductStatus,
} from "../../common/formatUtil";
import { useCustomQuery } from "../../hooks/useCustomQuery";
import { Auction_post, Bids } from "../../types/databaseRetrunTypes";
import { ShippingType } from "../../types/detailTyps";
import { Spacer } from "../ui/Spacer";
import BidButton from "./BidButton";
import connectSupabase from "../../api/connectSupabase";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

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
  const queryClient = useQueryClient();

  const queryBidOptions = {
    queryKey: ["getBidMaxPrice"],
    queryFn: () => fetchAuctionMaxBid(auctionData?.auction_id!),
    // ^^7 (갓진호 킹진호 신진호 미친진호 킹갓제너럴진호)
    enabled: !!auctionData?.auction_id,
    staleTime: Infinity,
  };
  const bidData = useCustomQuery<Bids, Error>(queryBidOptions);

  useEffect(() => {
    const changeObserverHandler = async (
      payload:
        | RealtimePostgresChangesPayload<Bids>
        | RealtimePostgresInsertPayload<Bids>
    ) => {
      if ("auction_id" in payload.new) {
        if (payload.new.auction_id === auctionData?.auction_id) {
          await queryClient.invalidateQueries({ queryKey: ["getBidMaxPrice"] });
        }
      }
    };

    const subscription = connectSupabase
      .channel("bids")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bids" },
        changeObserverHandler
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids" },
        changeObserverHandler
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [auctionData?.auction_id]);

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
          <span> ₩ {formatNumberWithCommas(auctionData?.lower_limit)}</span>
          <Spacer y={SPACER_HEIGHT} />
        </li>
        <li>
          <span>입찰가격 : </span>
          <span> ₩ {formatNumberWithCommas(bidData?.bid_price)}</span>
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
      <BidButton
        maxBidPrice={bidData?.bid_price}
        auctionId={auctionData?.auction_id}
      />
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
