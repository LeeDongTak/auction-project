import { Bids } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

export const fetchAuctionMaxBid = async (inputAuctionId: string) => {
  const { data, error } = await connectSupabase.rpc(
    "fetch_max_bid_for_auction",
    { input_auction_id: inputAuctionId }
  );
  if (error) throw new Error(error.message);
  if (!data) throw new Error("data is null");

  return data[0];
};

export const fetchPostAuctionBid = async (bid: Bids): Promise<number> => {
  const { status, error } = await connectSupabase.from("bids").insert(bid);

  if (error) throw new Error(error.message);

  return status;
};

export const fetchGetAuctionBidList = async (
  auction_id: string
): Promise<Bids[]> => {
  const { data, error } = await connectSupabase
    .from("bids")
    .select("*, user_info(user_email, nickname)")
    .eq("auction_id", auction_id)
    .order("bid_price", { ascending: false })
    .returns<Bids[]>();

  if (error) throw error;

  return data;
};
