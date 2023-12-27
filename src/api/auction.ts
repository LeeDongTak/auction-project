// auction 전체 호출 (조건에 따라 필터링 호출)
import { Auction_post } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

/**
 * auction 전체 데이터 호출
 * @returns Auction_post[]
 */
export async function fetchGetAuctions() {
  const { data } = await connectSupabase
    .from("auction_post")
    .select("*, category(category_name), user_info(")
    .returns<Auction_post[]>();

  console.log(data);

  return data;
}

export const fetchGetCategories = async () => {
  const { data } = await connectSupabase.from("category").select("*");
  return data;
};
