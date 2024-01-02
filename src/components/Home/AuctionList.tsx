import {
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { fetchAuctionMaxBid } from "../../api/bid";
import { fetchLikes, updateLike } from "../../api/likes";
import { calculateAuctionStatusAndTime, transDate } from "../../common/dayjs";
import clock from "../../images/clock.svg";
import coin from "../../images/coin.svg";
import end from "../../images/end.svg";
import flag from "../../images/flag.svg";
import placeholder from "../../images/placeholder.svg";
import heart from "../../images/thin_heart.svg";
import { supabase } from "../../supabase";
import { Auction_post } from "../../types/databaseRetrunTypes";
import { AuctionStatus } from "../../types/detailTyps";
import LikeButton from "./LikeButton";
// 경매 리스트 컴포넌트에 대한 props 타입 정의
interface AuctionListProps {
  auctions: Auction_post[] | null;
}

const AuctionList: React.FC<AuctionListProps> = ({ auctions }) => {
  const navigate = useNavigate();
  const [likesCount, setLikesCount] = useState<{ [key: string]: number }>({});

  // 각 경매에 대한 최대 입찰가를 가져오기 위한 쿼리
  const bidsQueries: any[] = useQueries({
    queries:
      auctions?.map((auction) => ({
        queryKey: ["auctionBid", auction.auction_id],
        queryFn: () =>
          fetchAuctionMaxBid(auction.auction_id).then(
            (data) => data ?? { bid_price: 0 }
          ),
      })) || [],
  });

  //  좋아요 상태를 관리하는 state
  const [likes, setLikes] = useState<{ [key: string]: boolean }>({});
  // 현재 로그인한 사용자의 ID를 저장하는 state
  const [userId, setUserId] = useState<string | null>(null);

  // 각 경매의 상태(경매 전, 진행중, 종료)를 관리하는 state
  const [auctionStatuses, setAuctionStatuses] = useState<
    Record<string, AuctionStatus>
  >({});

  // 경매 상태를 계산하고 상태를 업데이트하는 useEffect
  useEffect(() => {
    const newStatuses: Record<string, AuctionStatus> = {};
    auctions?.forEach((auction) => {
      const { auctionOver } = calculateAuctionStatusAndTime(
        auction.auction_start_date,
        auction.auction_end_date
      );
      newStatuses[auction.auction_id] = auctionOver;
    });
    setAuctionStatuses(newStatuses);
  }, [auctions]);

  // 사용자 로그인 상태 변경 시 userId 업데이트
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUserId(session?.user?.id || null);
      }
    );
    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // 사용자의 좋아요 상태를 불러오는 쿼리
  const { data: likeQuery, refetch: refetchLike } = useQuery({
    queryKey: ["likes", userId],
    queryFn: () => fetchLikes(userId!),
    enabled: !!userId,
  });

  // // 좋아요 데이터가 로드되었을 때 상태를 업데이트하는 useEffect
  // useEffect(() => {
  //   if (likeQuery.isSuccess && likeQuery.data) {
  //     setLikes(likeQuery.data as { [key: string]: boolean });
  //   }
  // }, [likeQuery.isSuccess, likeQuery.data]);

  // 좋아요 업데이트를 위한 뮤테이션 정의
  const queryClient = useQueryClient();
  const likeMutation = useMutation({
    mutationFn: (data: {
      auctionId: string;
      userId: string;
      isLiked: boolean;
    }) => updateLike(data),
    onSuccess: () => {
      // invalidateQueries 호출 시 객체 형태로 queryKey를 전달
      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["likes", userId],
        });

        refetchLike();
      }
    },
  });

  //좋아요 버튼 클릭 핸들러
  const LikeButtonClickHandler = (
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
    const previousLikes = { ...likes };
    const previousLikesCount = { ...likesCount }; // 이전 좋아요 수 상태를 저장

    // setLikes({ ...likes, [auctionId]: isLiked });

    // 서버에 좋아요 상태 업데이트 요청
    likeMutation.mutate(
      { auctionId, userId, isLiked: !likes[auctionId] },
      {
        onSuccess: () => {
          // 요청이 성공한 후에 로컬 상태 업데이트
          setLikes({ ...likes, [auctionId]: isLiked });
          setLikesCount((prev) => ({
            ...prev,
            [auctionId]: isLiked
              ? (prev[auctionId] || 0) + 1
              : Math.max((prev[auctionId] || 1) - 1, 0),
          }));
        },
        onError: () => {
          // 오류가 발생한 경우 이전 상태로 되돌림
          setLikes(previousLikes);
          setLikesCount(previousLikesCount);
          alert("좋아요 상태 업데이트에 실패했습니다");
        },
      }
    );
  };
  //이건 쓸모없는듯
  // useEffect(() => {
  //   if (likeQuery.data) {
  //     setLikes(likeQuery.data as { [key: string]: boolean });
  //   }
  // }, [likeQuery.data]);

  return (
    <StListwrapper>
      {auctions && auctions.length > 0 ? (
        <ul>
          {auctions.map((auction, index) => {
            const bidData = bidsQueries[index]?.data ?? { bid_price: 0 };
            const formattedBidPrice = bidData.bid_price.toLocaleString();
            // 경매 상태 텍스트 가져오기

            let auctionStatusText;
            const auctionStatus = auctionStatuses[auction.auction_id];

            switch (auctionStatus) {
              case AuctionStatus.READY:
                auctionStatusText = "[ 경매 전 ]";
                break;
              case AuctionStatus.START:
                auctionStatusText = "[ 진행중 ]";
                break;
              case AuctionStatus.END:
                auctionStatusText = "[ 종료 ]";
                break;
              default:
                auctionStatusText = "경매 상태 알수없음";
            }
            return (
              <li
                key={auction.auction_id}
                onClick={() => navigate(`/detail/${auction.auction_id}`)}
              >
                <StStatusImageWrapper>
                  <h3>{auctionStatusText}</h3>
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
                    <LikeButton
                      isLiked={likes[auction.auction_id]}
                      onLike={(e) =>
                        LikeButtonClickHandler(e, auction.auction_id)
                      }
                    />
                  </span>
                </StStatusImageWrapper>
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
                    <h3>
                      <img src={heart} />
                      &nbsp; 좋아요 {auction?.auction_like.length}
                    </h3>
                  </div>

                  <StNowPrice>현재 입찰 가격 ₩{formattedBidPrice}</StNowPrice>
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
      overflow-x: hidden;
      box-shadow: 2px 3px 4px #ccc;
      @media (max-width: 1230px) {
        width: 95%;
      }
      @media (max-width: 430px) {
        flex-wrap: wrap;
      }

      h1 {
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
        @media (max-width: 590px) {
          margin-bottom: 15px;
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
    @media (max-width: 935px) {
      flex-wrap: wrap;
    }

    img {
      height: 25px;
      vertical-align: middle;
    }
    @media (max-width: 430px) {
      gap: 0;
    }
  }

  @media (max-width: 430px) {
    margin-top: 10px;
    width: 100%;
  }

  h3 {
    @media (max-width: 430px) {
      width: 100%;

      line-height: 3rem;
    }
  }
`;

const StStatusImageWrapper = styled.div`
  @media (max-width: 430px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  h3 {
    text-align: center;
    color: #023e7d;
    font-weight: 600;
    margin-bottom: 5px;
  }
  span {
    overflow: hidden;
    width: 150px;
    display: block;
    height: 150px;

    position: relative;
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

  @media (max-width: 430px) {
    width: 100%;
  }
`;

const StStatus = styled.h3`
  text-align: right;
  color: #023e7d;
  font-weight: 600;
`;

const StNowPrice = styled.h2`
  font-size: 1.6rem;
  text-align: right;

  font-weight: bold;
  color: #023e7d;
  justify-content: flex-end;

  display: flex;
  p {
    background-color: yellow;

    &:first-of-type {
      background-color: green;
    }
  }
  @media (max-width: 590px) {
    margin-top: 20px;
  }
`;
