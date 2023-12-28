import React from "react";

import { Auction_post } from "../../types/databaseRetrunTypes";
// AuctionList 컴포넌트의 프로퍼티 타입 정의
interface AuctionListProps {
  auctions: Auction_post[] | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  return (
    <div>
      {/* 경매 데이터가 있으면 리스트로 표시, 없으면 로딩 문구 표시 */}
      {auctions ? (
        <ul>
          {/* 경매 데이터를 순회하면서 각 항목을 리스트 아이템으로 표시 */}
          {auctions.map((auction) => (
            <li key={auction.auction_id}>
              {/* 경매 시작 날짜 */}
              {auction.auction_start_date}
              {/* 경매 제목 */}
              {auction.title}
              {/* 경매 내용 */}
              {auction.content}
              {/* 카테고리 이름 */}
              {auction.category && (
                <span> ({auction.category.category_name})</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>로딩중입니다...</p>
      )}
    </div>
  );
};

export default AuctionList;
