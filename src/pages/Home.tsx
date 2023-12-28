import { useEffect, useState } from "react";
import { fetchGetAuctions } from "../api/auction";
import { supabase } from "../supabase";
import AuctionList from "../components/Home/AuctionList";
import CategorySelector from "../components/Home/CategorySelector";
import { Auction_post, Category } from "../types/databaseRetrunTypes";

const Home = () => {
  // 경매 데이터 State
  const [auctionData, setAuctionData] = useState<Auction_post[] | null>(null);
  // 선택된 카테고리 State
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
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

  // 경매 데이터를 가져오는 useEffect 훅
  useEffect(() => {
    // 경매 데이터를 비동기적으로 가져오는 함수
    const fetchData = async () => {
      const result = await fetchGetAuctions(
        queryOption.searchKeyword,
        queryOption.categories,
        queryOption.limit,
        queryOption.offset,
        queryOption.orderBy,
        queryOption.order
      );
      console.log(result);
      // 가져온 데이터로 State 업데이트
      setAuctionData(result || null);
    };

    // 함수 호출
    fetchData();
  }, [selectedCategories]);

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
      <AuctionList auctions={auctionData} />
    </div>
  );
};

export default Home;
