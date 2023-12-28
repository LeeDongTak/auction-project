import { useQuery } from "@tanstack/react-query";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../../../api/auction";
import { supabase } from "../../../supabase";
import { Auction_post, Category } from "../../../types/databaseRetrunTypes";
import ListSkeleton from "../../ListSkeletom/ListSkeleton";
import PostItem from "./PostItem/PostItem";

const PostList = () => {
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id as string);
    };
    fetchUser();
  }, []);

  const queryOption = {
    searchKeyword: "",
    categories: [] as Pick<Category, "category_id">[],
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
  });

  if (isLoading) {
    return <ListSkeleton />;
  }

  return (
    <StPostListWrapper>
      {posts?.map((post, index) => <PostItem post={post} key={index} />)}
      <Pagination defaultCurrent={1} total={50} />
    </StPostListWrapper>
  );
};

const StPostListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
`;

const StSkeleton = styled.div`
  display: flex;
  flex-direction: column;
`;

export default PostList;
