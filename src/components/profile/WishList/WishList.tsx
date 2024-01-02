import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctionsByIds } from "../../../api/auction";
import { deleteLikesById, fetchLikesByUserId } from "../../../api/likes";
import { QUERY_KEYS } from "../../../query/keys.constant";
import { Auction_post } from "../../../types/databaseRetrunTypes";
import PostItem from "../PostList/PostItem/PostItem";

interface PostListProps {
  title: string;
  userId: string;
}

const WishList = ({ title, userId }: PostListProps) => {
  const queryClient = new QueryClient();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  // 좋아요한 auction id 배열 가져오기
  const { data: likesData, refetch: refetchLikes } = useQuery({
    queryKey: [QUERY_KEYS.LIKES, userId, page],
    queryFn: () => fetchLikesByUserId(userId),
    enabled: !!userId && !!page,
  });

  const auctionIds = likesData?.map((like) => like.auction_id);

  const likeIds = likesData?.map((item) => item.like_id); // like 배열

  const queryOption = {
    auction_Ids: auctionIds as string[],
    limit:
      page === 1
        ? pageSize + (page - 1) * pageSize
        : pageSize + (page - 1) * pageSize + 1,
    offset: page === 1 ? 0 : (page - 1) * pageSize + 1,
  };

  // 전체 post 중 auction id에 해당되는 데이터 가져오기
  const { data: posts } = useQuery<Auction_post[]>({
    queryKey: [QUERY_KEYS.POSTS, userId, auctionIds?.[0], page, likeIds],
    queryFn: () => fetchGetAuctionsByIds(queryOption),
    enabled: !!auctionIds,
  });

  // 찜한 목록에서 삭제
  const { mutate: deleteLikeMutate } = useMutation({
    mutationFn: deleteLikesById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.LIKES, userId] });
      refetchLikes();
    },
  });

  // 삭제 로직 구현
  const deleteWishPostHandler = (auctionId: string) => {
    likesData?.map((like) => {
      if (like.auction_id === auctionId) {
        console.log("click!!!!");
        deleteLikeMutate(like.like_id);
      }
    });
  };

  const onClickPage = (selected: number) => {
    console.log(selected);
    setPage(selected);
  };

  return (
    <>
      <h2>{title}</h2>
      <StPostListWrapper>
        {posts?.length === 0 ? (
          <div>포스트가 없습니다.</div>
        ) : (
          <>
            {posts?.map((post) => (
              <PostItem
                key={post.auction_id}
                type={title}
                post={post}
                likeDeleteHandler={() =>
                  deleteWishPostHandler(post?.auction_id)
                }
              />
            ))}
          </>
        )}
        <StPaginationSection>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={auctionIds?.length}
            onChange={onClickPage}
          />
        </StPaginationSection>
      </StPostListWrapper>
    </>
  );
};

const StPostListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 2rem;
`;

const StPaginationSection = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export default WishList;
