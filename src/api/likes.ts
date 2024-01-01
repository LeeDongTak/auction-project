import connectSupabase from "./connectSupabase";
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

// 좋아요 상태를 업데이트하는 함수
export async function updateLike({
  auctionId,
  userId,
}: {
  auctionId: string;
  userId: string;
}) {
  const { data, error } = await connectSupabase
    .from("auction_like")
    .upsert({ auction_id: auctionId, user_id: userId });

  if (error) throw new Error(error.message);

  return data;
}
