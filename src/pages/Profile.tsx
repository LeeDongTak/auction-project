import { VerticalAlignTopOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { FloatButton } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../api/auth";
import { StListWrapper } from "../components/MyPagePosts/MyPagePosts.styles";
import PostList from "../components/MyPagePosts/PostList/PostList";
import ProfileMenu from "../components/MyPagePosts/ProfileMenu/ProfileMenu";
import EditProfile from "../components/UserProfile/EditProfile/EditProfile";
import UserProfile from "../components/UserProfile/UserProfile";
import { QUERY_KEYS } from "../query/keys.constant";
import { User_info } from "../types/databaseRetrunTypes";

const Profile = () => {
  const [activeTitle, setActiveTitle] = useState("내 게시물");

  const { user: userData } = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  const userId = userData.id;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
    select: (user) => user[0],
  });

  console.log("현재 유저 데이터", user);

  // const user = user?.[0] as User_info;

  return (
    <StProfileContainer>
      <UserProfile user={user as User_info} isLoading={isLoading} />
      <StPostWrapper>
        <ProfileMenu
          activeTitle={activeTitle}
          setActiveTitle={setActiveTitle}
        />
        <StListWrapper>
          {activeTitle === "내 게시물" && (
            <PostList title={activeTitle} userId={userId} />
          )}
          {activeTitle === "찜한 목록" && (
            <PostList title={activeTitle} userId={userId} />
          )}
          {activeTitle === "프로필 수정" && (
            <EditProfile title={activeTitle} user={user as User_info} />
          )}
        </StListWrapper>
      </StPostWrapper>
      <FloatButton
        shape="circle"
        type="primary"
        style={{ right: 24 }}
        icon={<VerticalAlignTopOutlined />}
      />
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
`;

const StPostWrapper = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  gap: 1rem;
`;

export default Profile;
