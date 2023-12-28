import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../../api/auction";
import { Auction_post, Category } from "../../../types/databaseRetrunTypes";
import ListSkeleton from "../../ListSkeletom/ListSkeleton";
import { StListWrapper } from "../MyPagePosts.styles";
import PostItem from "./PostItem/PostItem";

const PostList = ({ title }: { title: string }) => {
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

  console.log(posts);

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <StListWrapper>
      <h2>{title}</h2>
      {posts?.length === 0 ? (
        <div>포스트가 없습니다.</div>
      ) : (
        <>{posts?.map((post, index) => <PostItem post={post} key={index} />)}</>
      )}
      <Pagination defaultCurrent={1} total={50} />
    </StListWrapper>
  );
};

const StSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostList;
