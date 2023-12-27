// auction 전체 호출 (조건에 따라 필터링 호출)
import connectSupabase from "./connectSupabase";
import { Auction_post, Category } from "../types/databaseRetrunTypes";

/**
 * auction 전체 데이터 호출
 * @returns Auction_post[]
 */
export async function fetchGetAuctions(
  searchKeyword: string = "",
  categories: Pick<Category, "category_id">[] = [],
  limit: number = 20,
  offset: number = 0,
  orderBy: string = "created_at",
  order: boolean = false
) {
  const { data } = await connectSupabase
    .from("auction_post")
    .select("*, category(category_name), user_info(user_email)")
    .like("title", `%${searchKeyword}%`)
    .like("content", `%${searchKeyword}%`)
    .in("category_id", categories)
    .order(`${orderBy}`, { ascending: order })
    .returns<Auction_post[]>();

  return data;
}

export const fetchGetCategories = async () => {
  const { data } = await connectSupabase.from("category").select("*");
  return data;
};
