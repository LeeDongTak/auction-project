import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { styled } from "styled-components";
import AuctionList from "../components/Home/AuctionList";
import CategorySelector from "../components/Home/CategorySelector";
import useCustomInfinityQuery from "../hooks/useCustomInfinityQuery";
import { Auction_post, Category } from "../types/databaseRetrunTypes";
const Home = () => {
  // 선택된 카테고리와 정렬 타입을 관리하는 State
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [sortType, setSortType] = useState<"createdAt" | "title">("createdAt");

  // 경매 목록을 정렬하는 함수
  const compareAuctions = (a: Auction_post, b: Auction_post) => {
    if (sortType === "createdAt") {
      return (
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
    } else {
      return a.title.localeCompare(b.title);
    }
  };
  const client = useQueryClient();

  // 사용자 정의 무한 스크롤 쿼리 훅
  const {
    data: auctionData,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useCustomInfinityQuery(selectedCategories);

  useEffect(() => {
    if (status === "pending") {
      console.log("pending");
    }

    if (status === "error") {
      console.log(error?.message);
    }
  }, [status]);

  useEffect(() => {
    // 선택된 카테고리가 바뀔 때마다 쿼리를 리셋
    client.invalidateQueries({ queryKey: ["projects", selectedCategories] });
  }, [selectedCategories]);

  // 뷰포트 내의 요소 감지를 위한 Intersection Observer 훅
  const { ref } = useInView({
    threshold: 1,
    onChange: (inView) => {
      // 화면에 보이지 않거나 다음 페이지가 없거나 이미 다음 페이지를 불러오는 중이라면 반환
      if (!inView || !hasNextPage || isFetchingNextPage) return;
      fetchNextPage();
    },
  });

  // 정렬된 경매 목록
  const sortedAuctions =
    auctionData && Array.isArray(auctionData)
      ? [...auctionData].sort(compareAuctions)
      : [];

  // 카테고리 선택 핸들러
  const categorySelectHandler = (category: Category) => {
    setSelectedCategories((prev) => {
      // 이미 선택된 카테고리를 다시 클릭하면 제거, 아니면 추가
      // client.invalidateQueries();
      if (prev.find((c) => c.category_id === category.category_id)) {
        return prev.filter((c) => c.category_id !== category.category_id);
      } else {
        return [...prev, category];
      }
    });
  };

  return (
    <>
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
      {/* 무한 스크롤을 위한 참조 요소 */}
      <div ref={ref} style={{ height: "20px" }}></div>
    </>
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
  @media (max-width: 1200px) {
    width: 98%;
  }
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
