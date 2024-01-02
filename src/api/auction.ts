// auction 전체 호출 (조건에 따라 필터링 호출)
import { Auction_option, Auction_post } from "../types/databaseRetrunTypes";
import connectSupabase from "./connectSupabase";

type QueryType = {
  or: (callback: (orQuery: OrQueryType) => void) => QueryType;
  ilike: (field: string, value: string) => QueryType;
};

type OrQueryType = {
  ilike: (field: string, value: string) => OrQueryType;
};

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
export async function fetchGetAuctions({
  searchKeyword = "",
  categories = [],
  limit = 0,
  offset = 0,
  orderBy = "created_at",
  order = false,
  user_id = "",
  // pageParam = 1,
}: Auction_option) {
  const categoryIds = categories?.map((category) => {
    return category.category_id;
  });

  const query = connectSupabase
    .from("auction_post")
    .select(
      "*, category(category_name), user_info(user_email),auction_images(image_id, image_path)"
    )
    .order(`${orderBy}`, { ascending: order });

  // if (searchKeyword?.trim() !== "") {
  //   query
  //     .ilike("title", `%${searchKeyword}%`)
  //     .ilike("content", `%${searchKeyword}%`);
  // }

  // 타이틀 또는 컨텐츠에 포함되면
  if (searchKeyword?.trim() !== "") {
    query.or(`title.ilike.%${searchKeyword}%,content.ilike.%${searchKeyword}%`);
  }

  // (2)
  // if (searchKeyword?.trim() !== "") {
  //   const keywords = searchKeyword.trim().split(/\s+/);

  //   query.or((searchQuery) => {
  //     keywords.forEach((keyword) => {
  //       searchQuery
  //         .ilike("title", `%${keyword}%`)
  //         .ilike("content", `%${keyword}%`);
  //     });
  //   });
  // }

  user_id?.trim() !== "" && query.eq("user_id", user_id);

  limit !== 0 && query.range(offset, limit);

  if ((categories?.length as number) > 0) {
    query.in("category_id", categoryIds);
  }

  const { data, error } = await query.returns<Promise<Auction_post[]>>();
  if (error) throw new Error(error.message);

  return data;
}

export async function fetchGetInfinityAuctions({
  searchKeyword = "",
  categories = [],
  limit = 0,
  offset = 0,
  orderBy = "created_at",
  order = false,
  user_id = "",
  pageParam,
}: Auction_option) {
  const categoryIds = categories?.map((category) => {
    return category.category_id;
  });

  const query = connectSupabase
    .from("auction_post")
    .select(
      "*, category(category_name), user_info(user_email), auction_images(image_id, image_path), auction_like ( like_id, user_id, auction_id, created_at )"
    )
    .order(`${orderBy}`, { ascending: order })
    .range(pageParam!, pageParam! + limit);

  searchKeyword?.trim() !== "" &&
    query
      .like("title", `%${searchKeyword}%`)
      .like("content", `%${searchKeyword}%`);

  user_id?.trim() !== "" && query.eq("user_id", user_id);

  console.log(pageParam, pageParam! + limit);

  if ((categories?.length as number) > 0) {
    query.in("category_id", categoryIds);
  }

  const { data, error } = await query.returns<Promise<Auction_post[]>>();
  if (error) throw new Error(error.message);

  return data;
}

export const fetchGetCategories = async () => {
  const { data, error } = await connectSupabase.from("category").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const fetchGetCategoryById = async (category_id: string) => {
  const { data, error } = await connectSupabase
    .from("category")
    .select("*")
    .eq("category_id", category_id);

  console.log(data);

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

/**
 * auction_Ids로 auction 데이터 호출
 * @param auction_Ids
 */
export const fetchGetAuctionsByIds = async ({
  auction_Ids,
  limit = 0,
  offset = 0,
  orderBy = "created_at",
  order = false,
}: {
  auction_Ids: string[];
  limit?: number;
  offset?: number;
  orderBy?: string;
  order?: boolean;
}) => {
  const query = connectSupabase
    .from("auction_post")
    .select(
      `
      *, auction_images(image_id, image_path),
      category(category_name)`
    )
    .in("auction_id", auction_Ids)
    .order(`${orderBy}`, { ascending: order })
    .returns<Auction_post[]>();

  limit !== 0 && query.range(offset, limit);

  const { data, error } = await query.returns<Promise<Auction_post[]>>();

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
