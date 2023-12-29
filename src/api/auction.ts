// auction 전체 호출 (조건에 따라 필터링 호출)
import { Auction_post, Category } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

/**
 *
 * @param searchKeyword // 검색 키워드
 * @param categories // 카테고리
 * @param limit // 한번에 가져올 데이터 수
 * @param offset // 가져올 데이터 시작점
 * @param orderBy // 정렬 기준
 * @param order // 정렬 방식
 * @param user_id // 유저 아이디 (내가 쓴 글만 가져오기)
 */
export async function fetchGetAuctions(
  searchKeyword: string = "",
  categories: Category[],
  limit: number = 20,
  offset: number = 0,
  orderBy: string = "created_at",
  order: boolean = false,
  user_id: string = ""
) {
  console.log(categories);
  const categoryIds = categories.map((category) => {
    return category.category_id;
  });

  const query = connectSupabase
    .from("auction_post")
    .select(
      "*, category(category_name), user_info(user_email),auction_images(image_id, image_path)"
    )
    .order(`${orderBy}`, { ascending: order });

  searchKeyword.trim() !== "" &&
    query
      .like("title", `%${searchKeyword}%`)
      .like("content", `%${searchKeyword}%`);

  user_id.trim() !== "" && query.eq("user_id", user_id);

  if (categories.length > 0) {
    query.in("category_id", categoryIds);
  }

  const { data, error } = await query.returns<Auction_post[]>();
  console.log(data);
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
export const fetchPatchAuctionPost = async (
  auctionPost: Partial<Auction_post>
): Promise<number> => {
  const { status, error, statusText } = await connectSupabase
    .from("auction_post")
    .update({ ...auctionPost })
    .eq("auction_id", auctionPost.auction_id!);
  if (error) throw new Error(error.message);

  return status;
};
