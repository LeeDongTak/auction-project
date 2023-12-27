import { useQuery } from "@tanstack/react-query";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../api/auction";
import { Auction_post, Category } from "../../types/databaseRetrunTypes";

interface Props {
  userId: string;
}

const MyPagePosts = ({ userId }: Props) => {
  const queryOption = {
    searchKeyword: "",
    categories: [] as Pick<Category, "category_id">[],
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
    user_id: userId,
  };

  const { data: posts } = useQuery<Auction_post[]>({
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
  });

  return (
    <StPostContainer>
      <StCategoryWrapper>
        <li>category1</li>
        <li>category2</li>
        <li>category3</li>
        <li>category4</li>
      </StCategoryWrapper>
      <StPostsWrapper>
        {posts?.map((post) => <li key={post.user_id}>{post.title}</li>)}
      </StPostsWrapper>
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  background-color: #eee;
`;

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  font-size: small;
  background-color: #999;
`;

const StPostsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

export default MyPagePosts;
