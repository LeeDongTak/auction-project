import { Bids } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

export const fetchAuctionMaxBid = async (auction_id: string): Promise<Bids> => {
  const { data, error } = await connectSupabase
    .from("bids")
    .select("*, user_info(user_email, nickname)")
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

export const fetchPostAuctionBid = async (bid: Bids): Promise<number> => {
  const { status, error, statusText } = await connectSupabase
    .from("bids")
    .insert(bid);

  if (error) throw new Error(error.message);

  return status;
};

export const fetchPatchAuctionBid = async (bid: Bids): Promise<number> => {
  const { status, error, statusText } = await connectSupabase
    .from("bids")
    .update(bid);

  if (error) throw new Error(error.message);

  return status;
};
