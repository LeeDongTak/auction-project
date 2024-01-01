import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../../api/auction";
import { QUERY_KEYS } from "../../../query/keys.constant";
import {
  Auction_option,
  Auction_post,
} from "../../../types/databaseRetrunTypes";
import PostItem from "./PostItem/PostItem";

interface PostListProps {
  title: string;
  userId: string;
  userAllPostsLength?: number;
}

const PostList = ({ title, userId, userAllPostsLength }: PostListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [limit, setLimit] = useState<number>(5);

  console.log(userAllPostsLength);

  const queryOption: Auction_option = {
    user_id: userId,
    limit: pageSize + (page - 1) * pageSize,
    offset:
      (page - 1) * pageSize === 0
        ? (page - 1) * pageSize
        : (page - 1) * pageSize + 1,
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Auction_post[]>({
    queryKey: [QUERY_KEYS.POSTS, userId, page],
    queryFn: () => fetchGetAuctions(queryOption),
    enabled: !!userId,
    staleTime: 0,
    // keepPreviousData: true,
  });

  //TODO: 무한 스크롤 구현
  // 옵션 import 오류
  // const {
  //   fetchNextPage,
  //   fetchPreviousPage,
  //   hasNextPage,
  //   hasPreviousPage,
  //   isFetchingNextPage,
  //   isFetchingPreviousPage,
  //   ...result
  // } = useInfiniteQuery({
  //   queryKey: ["posts"],
  //   queryFn: ({ pageParam = 1 }) =>
  //     fetchGetAuctions({ ...queryOption, pageParam }),
  //   getNextPageParam: (lastPage) => lastPage.nextCursor,
  //   getPreviousPageParam: (firstPage) => firstPage.prevCursor,
  // });

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
        {/* <button onClick={() => setLimit((prev) => prev + 5)}>더보기</button> */}
        <StPaginationSection>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={userAllPostsLength}
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

export default PostList;
