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
  userAllPostsLength?: number;
}

const PostList = ({ title, userId, userAllPostsLength }: PostListProps) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(4);

  useEffect(() => {
    console.log("limit", pageSize);
    console.log("offset", (page - 1) * pageSize);
    console.log("page", page);
    console.log(pageSize - (page - 1) * pageSize);
  }, [page, pageSize]);

  const queryOption: Auction_option = {
    user_id: userId,
    limit:
      page === 1
        ? pageSize + (page - 1) * pageSize
        : pageSize + (page - 1) * pageSize + 1,
    offset: page === 1 ? 0 : (page - 1) * pageSize + 1,
  };

  // 내 게시물
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
