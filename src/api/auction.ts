// auction 전체 호출 (조건에 따라 필터링 호출)
import connectSupabase from "./connectSupabase";
import { Auction_post, Category } from "../types/databaseRetrunTypes";

/**
 * auction 전체 데이터 호출
 * @returns Auction_post[]
 */
export async function fetchGetAuctions(
  searchKeyword: string = "",
  categories: Pick<Category, "category_id">[],
  limit: number = 20,
  offset: number = 0,
  orderBy: string = "created_at",
  order: boolean = false
) {
  const query = connectSupabase
    .from("auction_post")
    .select("*, category(category_name), user_info(user_email)")
    .order(`${orderBy}`, { ascending: order });

  if (searchKeyword) {
    query
      .like("title", `%${searchKeyword}%`)
      .like("content", `%${searchKeyword}%`);
  }

  if (categories.length > 0) {
    query.in("category_id", categories);
  }

  const { data, error } = await query.returns<Auction_post[]>();

  if (error) throw new Error(error.message);

  return data;
}

export const fetchGetCategories = async () => {
  const { data, error } = await connectSupabase.from("category").select("*");

  if (error) throw new Error(error.message);
  return data;
};

/**
 * auction_id로 auction 데이터 호출
 * @param auction_id
 */
export const fetchGetAuctionById = async (auction_id: string) => {
  const { data, error } = await connectSupabase
    .from("auction_post")
    .select(
      `
      *, auction_images(image_id, image_path),
      category(category_name)`
    )
    .eq("auction_id", auction_id)
    .returns<Auction_post>()
    .single();
  if (error) throw new Error(error.message);

  return data;
};
