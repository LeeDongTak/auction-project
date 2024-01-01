import connectSupabase from "./connectSupabase";

//좋아요 수를 가져오는 함수
export async function fetchLikesCount(auctionId: string) {
  const { data, error } = await connectSupabase
    .from("auction_like")
    .select("*", { count: "exact" })
    .eq("auction_id", auctionId);

  if (error) throw new Error(error.message);

  return data.length; // 좋아요 수 반환
}

// 좋아요 상태를 불러오는 함수
export async function fetchLikes(userId: string) {
  const { data, error } = await connectSupabase
    .from("auction_like")
    .select("auction_id")
    .eq("user_id", userId);

  if (error) throw new Error(error.message);

  // { [auction_id]: true } 형태로 변환
  const likes: { [key: string]: boolean } = {};
  data.forEach(({ auction_id }) => {
    likes[auction_id] = true;
  });

  return likes;
}

export async function getAuctionIdByLikes(userId: string) {
  const { data, error } = await connectSupabase
    .from("auction_like")
    .select("auction_id")
    .eq("user_id", userId);

  const auctionId = data?.map((item) => item.auction_id);

  if (error) throw new Error(error.message);

  return auctionId;
}

// 좋아요 상태를 업데이트하는 함수
export async function updateLike({
  auctionId,
  userId,
  isLiked,
}: {
  auctionId: string;
  userId: string;
  isLiked: boolean;
}) {
  if (isLiked) {
    // 좋아요 상태일 때는 데이터를 추가
    const { data, error } = await connectSupabase
      .from("auction_like")
      .upsert({ auction_id: auctionId, user_id: userId });

    if (error) throw new Error(error.message);

    return data;
  } else {
    // 좋아요 해제 상태일 때는 데이터를 삭제
    const { data, error } = await connectSupabase
      .from("auction_like")
      .delete()
      .eq("auction_id", auctionId)
      .eq("user_id", userId);

    if (error) throw new Error(error.message);

    return data;
  }
}
