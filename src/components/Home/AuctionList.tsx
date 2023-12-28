import React from "react";
import { styled } from "styled-components";
import { Auction_post } from "../../types/databaseRetrunTypes";
interface AuctionListProps {
  auctions: Auction_post[] | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  return (
    <StListwrapper>
      {auctions ? (
        <ul>
          {auctions.map((auction) => (
            <li key={auction.auction_id}>
              {auction.auction_start_date}
              {auction.title}
              {auction.content}
              {auction.category && (
                <span> ({auction.category.category_name})</span>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>로딩중입니다...</p>
      )}
    </StListwrapper>
  );
};

export default AuctionList;

const StListwrapper = styled.div`
  ul {
  }
`;
