import { Bids } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

export const fetchAuctionMaxBid = async (auction_id: string): Promise<Bids> => {
  console.log("fetchAuctionMaxBid => ", auction_id);
  const { data, error } = await connectSupabase
    .from("bids")
    .select("*")
    .eq("auction_id", auction_id);

  if (error) throw new Error(error.message);

  return data?.reduce(
    (acc, cur) => {
      if (acc.bid_price < cur.bid_price) acc = cur;
      return acc;
    },
    data ? data[0] : { bid_price: 0 }
  ) as Bids;
};
