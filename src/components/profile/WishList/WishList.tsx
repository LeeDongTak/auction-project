import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctionsByIds } from "../../../api/auction";
import { getAuctionIdByLikes } from "../../../api/likes";
import { QUERY_KEYS } from "../../../query/keys.constant";
import { Auction_post } from "../../../types/databaseRetrunTypes";
import PostItem from "../PostList/PostItem/PostItem";

interface PostListProps {
  title: string;
  userId: string;
}

const WishList = ({ title, userId }: PostListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  // 좋아요한 auction id 배열 가져오기
  const { data: auctionIds } = useQuery({
    queryKey: [QUERY_KEYS.LIKES, userId],
    queryFn: () => getAuctionIdByLikes(userId),
    enabled: !!userId,
  });

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
    queryKey: [QUERY_KEYS.POSTS, userId, auctionIds?.[0], page],
    queryFn: () => fetchGetAuctionsByIds(queryOption),
    enabled: !!auctionIds,
  });

  // TODO: 찜한 목록에서 삭제 버튼 구현 (삭제 시 좋아요 취소)

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
              <PostItem post={post} key={post.auction_id} type={title} />
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
