import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchGetInfinityAuctions } from "../api/auction";
import { Auction_option, Category } from "../types/databaseRetrunTypes";

// 선택된 카테고리를 인자로 받아 무한 스크롤 쿼리를 수행하는 사용자 정의 훅
const useCustomInfinityQuery = (selectedCategories: Category[]) => {
  const queryOption: Auction_option = {
    searchKeyword: "",
    categories: selectedCategories,
    limit: 20, // 한 페이지당 아이템 수
    offset: 0, // 시작 위치
    orderBy: "created_at", // 정렬 기준
    order: false, // 오름차순 또는 내림차순
  };

  const {
    data,
    error,
    fetchNextPage, // 다음 페이지 데이터를 불러오는 함수
    hasNextPage, // 다음 페이지가 있는지 여부
    isFetching, // 데이터를 불러오는 중인지 여부
    isFetchingNextPage, // 다음 페이지 데이터를 불러오는 중인지 여부
    status, // 쿼리 상태
    refetch, // refetch 위한 함수
  } = useInfiniteQuery({
    queryKey: ["projects", selectedCategories], // 쿼리 키
    queryFn: ({ pageParam }) =>
      fetchGetInfinityAuctions({ ...queryOption, pageParam }), // 쿼리 함수
    initialPageParam: 0, // 초기 페이지 파라미터
    getNextPageParam: (lastPage, allPages) => {
      // 다음 페이지를 결정하는 함수
      if (lastPage.length < queryOption.limit!) {
        return null; // 더 이상 불러올 데이터가 없음
      }
      return allPages.length * queryOption.limit!;
    },
    select: (data) => {
      // 데이터 선택 및 변환
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
    refetch,
  };
};

export default useCustomInfinityQuery;
