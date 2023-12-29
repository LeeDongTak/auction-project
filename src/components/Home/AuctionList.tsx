import { useQueries } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { transDate } from "../../common/dayjs";
import clock from "../../images/clock.svg";
import placeholder from "../../images/placeholder.svg";
import { Auction_post } from "../../types/databaseRetrunTypes";
interface AuctionListProps {
  auctions: Auction_post[] | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  const navigate = useNavigate();

  const bidsQueries = useQueries({
    queries:
      auctions?.map((auction) => ({
        queryKey: ["auctionBid", auction.auction_id],
        queryFn: () =>
          fetchAuctionMaxBid(auction.auction_id).then(
            (data) => data ?? { bid_price: 0 }
          ),
      })) || [],
  });

  return (
    <StListwrapper>
      {auctions && auctions.length > 0 ? (
        <ul>
          {auctions.map((auction, index) => {
            const bidData = bidsQueries[index]?.data ?? { bid_price: 0 };
            const formattedBidPrice = bidData.bid_price.toLocaleString();

            return (
              <li
                key={auction.auction_id}
                onClick={() => navigate(`/detail/${auction.auction_id}`)}
              >
                <h6>
                  <img src={clock} alt="Clock" />
                  {transDate(auction.created_at)}
                </h6>
                <span>
                  <img
                    src={
                      auction.auction_images &&
                      auction.auction_images.length > 0
                        ? auction.auction_images[0].image_path
                        : placeholder
                    }
                    alt="Auction"
                  />
                </span>
                <h2>{auction.title}</h2>
                <p>{auction.content}</p>
                <h3>시작: {transDate(auction.auction_start_date)}</h3>
                <h3>마감: {transDate(auction.auction_end_date)}</h3>
                <h3>시작가격: ₩ {auction.lower_limit.toLocaleString()}</h3>
                <h3>입찰가격: ₩ {formattedBidPrice}</h3>
                {auction.category && <h5>{auction.category.category_name}</h5>}
              </li>
            );
          })}
        </ul>
      ) : (
        <>
          <StNoItemMessage>
            해당 카테고리에는 경매 아이템이 없습니다.
          </StNoItemMessage>
          <StNoItemMessage>
            다른 카테고리를 선택하시거나 새로운 경매아이템을 등록해주세요.
          </StNoItemMessage>
        </>
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
    user-select: none;
    li {
      font-size: 1.3rem;
      border: 2px solid #afcaff;
      padding: 15px 20px 15px 30px;
      line-height: 2rem;
      cursor: pointer;
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
        img {
          box-shadow: none !important;
          width: 20px;
          vertical-align: middle;
          margin-right: 5px;
        }
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
      span {
        img {
          height: 150px;
          border-radius: 10px;
        }
      }
    }
  }
`;

const StNoItemMessage = styled.h4`
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.3rem;
`;
