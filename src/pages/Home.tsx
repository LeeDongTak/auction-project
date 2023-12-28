import { useEffect, useState } from "react";
import { fetchGetAuctions } from "../api/auction";
import AuctionList from "../components/Home/AuctionList";
import { Auction_post, Category } from "../types/databaseRetrunTypes";
const Home = () => {
  const [auctionData, setAuctionData] = useState<Auction_post[] | null>(null);
  const queryOption = {
    searchKeyword: "",
    categories: [] as Pick<Category, "category_id">[],
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
  };

  //useEffect(() => {
  //  (async () => {
  //    const fetchData = await fetchGetAuctions(
  //      queryOption.searchKeyword,
  //      queryOption.categories,
  //      queryOption.limit,
  //      queryOption.offset,
  //      queryOption.orderBy,
  //      queryOption.order
  //    );
  //    setAuctionData(fetchData);
  //  })();
  //}, []);
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchGetAuctions(
        queryOption.searchKeyword,
        queryOption.categories,
        queryOption.limit,
        queryOption.offset,
        queryOption.orderBy,
        queryOption.order
      );
      setAuctionData(result || null);
    };

    fetchData();
  }, []);
  console.log(auctionData);

  return (
    <div>
      <AuctionList auctions={auctionData} />
    </div>
  );
};

export default Home;
