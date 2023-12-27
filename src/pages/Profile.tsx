import { useEffect, useState } from "react";
import MyPagePosts from "../components/MyPagePosts/MyPagePosts";
import UserProfile from "../components/UserProfile/UserProfile";
import { supabase } from "../supabase";

interface UserInfo {
  id: string;
  email: string;
  nickname: string;
}

const Profile = () => {
  const [userId, setUserId] = useState<string>("");
  const [user, setUser] = useState<UserInfo>();

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
      {/* 프로필 */}
      <UserProfile />
      {/* 리스트 컨테이너 - 메뉴, 리스트 */}
      <MyPagePosts userId={userId} />
    </div>
  );
};

export default Profile;
