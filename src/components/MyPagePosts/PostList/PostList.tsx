import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../../api/auction";
import { Auction_post, Category } from "../../../types/databaseRetrunTypes";
import ListSkeleton from "../../ListSkeletom/ListSkeleton";
import PostItem from "./PostItem/PostItem";

const PostList = () => {
  // localstorage로 user-id 가져오기
  const userData = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );
  const userId = userData.user.id;

  const queryOption = {
    searchKeyword: "",
    categories: [] as Category[],
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
    user_id: userId,
  };

  const {
    data: posts,
    isLoading,
    isError,
    error,
  } = useQuery<Auction_post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetchGetAuctions(
        queryOption.searchKeyword,
        queryOption.categories,
        queryOption.limit,
        queryOption.offset,
        queryOption.orderBy,
        queryOption.order,
        queryOption.user_id
      ),
    enabled: !!userId,
  });

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <StPostListWrapper>
      <h2>카테고리 이름</h2>
      {posts?.map((post, index) => <PostItem post={post} key={index} />)}
      <Pagination defaultCurrent={1} total={50} />
    </StPostListWrapper>
  );
};

const StPostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h2 {
    padding: 1rem 0;
    font-size: medium;
    font-weight: 500;
  }
`;

const StSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostList;
