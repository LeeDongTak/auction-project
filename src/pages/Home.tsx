import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { styled } from "styled-components";
import { fetchGetAuctions } from "../api/auction";
import AuctionList from "../components/Home/AuctionList";
import CategorySelector from "../components/Home/CategorySelector";
import { Auction_post, Category } from "../types/databaseRetrunTypes";
const Home = () => {
  // // 경매 데이터 State
  // const [auctionData, setAuctionData] = useState<Auction_post[] | null>(null);
  // 선택된 카테고리 State
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [sortType, setSortType] = useState<"createdAt" | "title">("createdAt");
  console.log(selectedCategories);
  // 쿼리 옵션
  const queryOption = {
    searchKeyword: "",
    categories: selectedCategories,
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
  };
  // useQuery를 사용하여 데이터 가져오기
  const {
    data: auctionData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["auctionData", selectedCategories],
    queryFn: () => fetchGetAuctions(queryOption),
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>오류: {error.message}</div>;

  const sortAuctions = (a: Auction_post, b: Auction_post) => {
    if (sortType === "createdAt") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      return a.title.localeCompare(b.title);
    }
  };

  const sortedAuctions =
    auctionData && Array.isArray(auctionData)
      ? [...auctionData].sort(sortAuctions)
      : [];

  // // 경매 데이터를 가져오는 useEffect 훅
  // useEffect(() => {
  //   // 경매 데이터를 비동기적으로 가져오는 함수
  //   const fetchData = async () => {
  //     const result = await fetchGetAuctions(
  //       queryOption.searchKeyword,
  //       queryOption.categories,
  //       queryOption.limit,
  //       queryOption.offset,
  //       queryOption.orderBy,
  //       queryOption.order
  //     );
  //     console.log(result);
  //     // 가져온 데이터로 State 업데이트
  //     setAuctionData(result || null);
  //   };

  //   // 함수 호출
  //   fetchData();
  // }, [selectedCategories]);

  // 카테고리 선택 핸들러
  const categorySelectHandler = (category: Category) => {
    console.log(category);
    setSelectedCategories((prev) => {
      // 이미 선택된 카테고리를 다시 클릭하면 제거, 아니면 추가
      if (prev.find((c) => c.category_id === category.category_id)) {
        return prev.filter((c) => c.category_id !== category.category_id);
      } else {
        return [...prev, category];
      }
    });
  };

  console.log(selectedCategories);
  return (
    <div>
      {/* 카테고리 선택 컴포넌트 */}
      <CategorySelector
        onCategorySelect={categorySelectHandler}
        selectedCategories={selectedCategories}
      />
      {/* 경매 목록 컴포넌트 */}
      <StSortButton>
        <button
          onClick={() => setSortType("title")}
          style={{
            color: sortType === "title" ? "#023e7d" : "inherit",
          }}
        >
          이름순
        </button>
        <button
          onClick={() => setSortType("createdAt")}
          style={{
            color: sortType === "createdAt" ? "#023e7d" : "inherit",
          }}
        >
          최신순
        </button>
      </StSortButton>
      <AuctionList auctions={sortedAuctions} />
    </div>
  );
};

export default Home;

const StSortButton = styled.div`
  width: 1200px;
  display: flex;
  margin: 20px auto;
  justify-content: flex-end;
  user-select: none;
  background-color: #eee;
  padding: 15px 10px;
  border-radius: 5px;
  button {
    border: none;
    font-size: 1.2rem;
    padding: 5px 10px;
    border-radius: 3px;
    font-weight: bold;
    cursor: pointer;
    background-color: transparent;
    &:last-of-type {
      margin-left: 10px;
    }
    &:hover {
      background-color: #fffacd;
    }
  }
`;
