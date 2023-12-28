import React from "react";

import { Auction_post } from "../../types/databaseRetrunTypes";
interface AuctionListProps {
  auctions: Auction_post[] | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  return (
    <div>
      {auctions ? (
        <ul>
          {auctions.map((auction) => (
            <li key={auction.auction_id}>
              {auction.auction_start_date}
              {auction.title}
              {auction.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default AuctionList;
