import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGetInfinityAuctions } from "../api/auction";
import { Auction_option, Category } from "../types/databaseRetrunTypes";

const useCustomInfinityQuery = (selectedCategories: Category[]) => {
  const queryOption: Auction_option = {
    searchKeyword: "",
    categories: selectedCategories,
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["projects", selectedCategories],
    queryFn: ({ pageParam }) =>
      fetchGetInfinityAuctions({ ...queryOption, pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < queryOption.limit!) {
        return null; // 더 이상 불러올 데이터가 없음
      }
      return allPages.length * queryOption.limit!;
    },
    select: (data) => {
      return data.pages.reduce((a, c) => a.concat(c), []);
    },
  });
  return {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useCustomInfinityQuery;
