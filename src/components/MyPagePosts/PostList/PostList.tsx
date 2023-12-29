import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../../api/auction";
import { Auction_post, Category } from "../../../types/databaseRetrunTypes";
import ListSkeleton from "../../ListSkeletom/ListSkeleton";
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
        <StPaginationSection>
          <Pagination defaultCurrent={1} total={50} />
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
`;

const StSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostList;
