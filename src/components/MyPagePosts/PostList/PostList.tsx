import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
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
}

const PostList = ({ title, userId }: PostListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [limit, setLimit] = useState<number>(5);

  useEffect(() => {
    console.log("limit", pageSize + (page - 1) * pageSize);
    console.log("offset", (page - 1) * pageSize);
    console.log("page", page);
  }, [page, pageSize]);

  const queryOption: Auction_option = {
    // user_id: userId,
    limit: pageSize + (page - 1) * pageSize,
    offset: (page - 1) * pageSize,
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<Auction_post[]>({
    queryKey: [QUERY_KEYS.POSTS],
    queryFn: () => fetchGetAuctions(queryOption),
    enabled: !!userId,
    // keepPreviousData: true,
  });

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

  //TODO: 무한 스크롤 구현

  // TODO: 페이지네이션
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
            {posts?.map((post, index) => <PostItem post={post} key={index} />)}
          </>
        )}
        {/* <button onClick={() => setLimit((prev) => prev + 5)}>더보기</button> */}
        <StPaginationSection>
          <Pagination
            current={page}
            pageSize={pageSize}
            total={50}
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
