import React from "react";
import { styled } from "styled-components";
import clock from "../../images/clock.svg";
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
              <h6>
                <img src={clock} />
                {auction.auction_start_date}
              </h6>
              <h2> {auction.title}</h2>
              <p> {auction.content}</p>
              {auction.category && <h5> {auction.category.category_name}</h5>}
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
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    li {
      font-size: 1.3rem;
      border: 2px solid #afcaff;
      padding: 15px 20px 15px 30px;
      line-height: 2rem;
      border-radius: 10px;
      margin: 10px 0;
      position: relative;
      width: 1200px;
      box-shadow: 2px 3px 4px #ccc;
      h2 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h6 {
        text-align: right;
      }
      h5 {
        background-color: #afcaff;
        padding: 5px 10px;
        font-size: 1.1rem;
        font-weight: bold;
        border-radius: 5px;
        float: right;
        right: 10px;
        text-align: center;
        bottom: 10px;
        width: 75px;
        margin-top: 14px;
      }
      p {
        width: 1100px;
        height: 24px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      img {
        box-shadow: none !important;
        width: 20px;
        vertical-align: middle;
        margin-right: 5px;
      }
    }
  }
`;
