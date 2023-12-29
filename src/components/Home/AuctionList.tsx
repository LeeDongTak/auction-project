import { useQueries } from "@tanstack/react-query";
import React from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { transDate } from "../../common/dayjs";
import clock from "../../images/clock.svg";
import coin from "../../images/coin.svg";
import end from "../../images/end.svg";
import flag from "../../images/flag.svg";
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
                <StInfoContainer>
                  <h6>
                    <img src={clock} alt="Clock" />
                    {transDate(auction.created_at)}
                  </h6>

                  <h1>{auction.title}</h1>
                  <p>{auction.content}</p>
                  <div>
                    <h3>
                      <img src={flag} />
                      &nbsp;
                      {transDate(auction.auction_start_date)} 시작
                    </h3>
                    <h3>
                      <img src={end} /> &nbsp;
                      {transDate(auction.auction_end_date)} 마감
                    </h3>
                    <h3>
                      <img src={coin} /> &nbsp;시작 가격 ₩
                      {auction.lower_limit.toLocaleString()}
                    </h3>
                  </div>
                  <h2>현재 입찰 가격 ₩ {formattedBidPrice}</h2>
                  {auction.category && (
                    <h5>{auction.category.category_name}</h5>
                  )}
                </StInfoContainer>
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
      display: flex;
      box-sizing: border-box;
      align-items: center;
      justify-content: space-between;
      line-height: 2rem;
      cursor: pointer;
      border-radius: 10px;
      margin: 20px 0;
      position: relative;
      width: 1200px;
      box-shadow: 2px 3px 4px #ccc;
      h1 {
        font-size: 1.8rem;
        font-weight: bold;
        margin-bottom: 10px;
      }
      h2 {
        font-size: 1.6rem;
        text-align: right;
        font-weight: bold;
        color: #80abff;
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
        width: 85px;
        margin-top: 14px;
      }
      p {
        width: 960px;
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

const StInfoContainer = styled.div`
  width: calc(100% - 180px);

  div {
    display: flex;
    margin-top: 20px;
    gap: 20px;
    align-items: center;
    img {
      height: 25px;
      vertical-align: middle;
    }
  }
`;
