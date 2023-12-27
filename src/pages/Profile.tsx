import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { fetchGetAuctions } from "../api/auction";
import { supabase } from "../supabase";
import { Auction_post, Category } from "../types/databaseRetrunTypes";

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
}

const Profile = () => {
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<UserInfo>();

  const queryOption = {
    searchKeyword: "",
    categories: [] as Pick<Category, "category_id">[],
    limit: 20,
    offset: 0,
    orderBy: "created_at",
    order: false,
    user_id: userId,
  };

  const { data: posts } = useQuery<Auction_post[]>({
    queryKey: ["posts"],
    queryFn: () =>
      fetchGetAuctions(
        queryOption.searchKeyword,
        queryOption.categories,
        queryOption.limit,
        queryOption.offset,
        queryOption.orderBy,
        queryOption.order,
        queryOption.user_id
      ),
  });

  console.log(posts);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserId(data.user?.id as string);
    };
    fetchUser();
  }, []);

  // TODO: userInfo 가져와서 id 값과 같은 것 필터링 - 프로필
  // TODO: userId로 게시물 필터링
  // TODO: 내가 올린 목록, 내가 참여한? 목록, 찜한 목록
  // TODO: 프로필 수정

  console.log(userId);

  return (
    <div>
      <p>hihi</p>
      <p>{user?.nickname}</p>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
    </div>
  );
};

export default Profile;
