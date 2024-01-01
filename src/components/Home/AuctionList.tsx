import { useMutation, useQueries, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { fetchLikes, updateLike } from "../../api/likes";
import { transDate } from "../../common/dayjs";
import clock from "../../images/clock.svg";
import coin from "../../images/coin.svg";
import end from "../../images/end.svg";
import flag from "../../images/flag.svg";
import placeholder from "../../images/placeholder.svg";
import { supabase } from "../../supabase";
import { Auction_post } from "../../types/databaseRetrunTypes";
import LikeButton from "./LikeButton";
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

  // 좋아요 상태 관리
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  // 현재 로그인한 사용자의 정보를 가져오는 로직
  const [userId, setUserId] = useState<string | null>(null);
  // 좋아요를 했는지 안했는지 확인할수 있는 상태 관리
  const [likedAuctions, setLikedAuctions] = useState<{
    [key: string]: boolean;
  }>({});
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id || null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 좋아요 상태를 불러오는 쿼리
  const likeQuery = useQuery({
    queryKey: ["likes", userId],
    queryFn: () => fetchLikes(userId!),
    enabled: !!userId,
  });
  // 좋아요 업데이트를 위한 뮤테이션
  const likeMutation = useMutation({
    mutationFn: (data: { auctionId: string; userId: string }) =>
      updateLike(data),
  });
  const handleLike = (
    event: React.MouseEvent<HTMLButtonElement>,
    auctionId: string
  ) => {
    event.preventDefault();
    event.stopPropagation();

    if (!userId) {
      alert("로그인한 사용자만 찜 기능을 사용하실 수 있습니다");
      return;
    }

    // 좋아요 상태 토글
    const isLiked = !likes[auctionId];
    setLikes({ ...likes, [auctionId]: isLiked });

    // 서버에 좋아요 상태 업데이트 요청
    likeMutation.mutate({ auctionId, userId });
  };

  useEffect(() => {
    if (likeQuery.data) {
      setLikes(likeQuery.data as { [key: string]: boolean });
    }
  }, [likeQuery.data]);

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
                  <LikeButton
                    isLiked={likes[auction.auction_id]}
                    onLike={(e) => handleLike(e, auction.auction_id)}
                  />
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
      border: 2px solid #023e7d;
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
        color: #023e7d;
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
        background-color: #fffacd;
        padding: 5px 10px;
        font-size: 1.1rem;
        font-weight: bold;
        border-radius: 5px;
        float: right;
        box-sizing: border-box;
        color: #023e7d;
        border: 1px solid #023e7d;
        right: 10px;
        text-align: center;
        bottom: 10px;
        width: 105px;
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
        overflow: hidden;
        width: 150px;
        height: 150px;
        border: 2px solid #eee;

        border-radius: 10px;
        img {
          width: 100%;
          height: 100%;
          object-fit: scale-down;
          vertical-align: middle;
          margin: auto;
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
