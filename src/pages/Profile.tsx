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

  return (
    <StProfileContainer>
      <UserProfile user={user as User_info} />
      <StPostContainer>
        <StPostsWrapper>
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
        </StPostsWrapper>
      </StPostContainer>
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
const StUserProfile = styled.div`
  display: flex;
  width: 100%;
  background-color: #333;
  height: 200px;
  min-height: 200px;
  align-items: center;
`;

const StPostContainer = styled.div`
  display: flex;
  width: 100%;
  gap: 4rem;
  padding: 2rem;
  color: #222;
`;

const StPostsWrapper = styled.div`
  display: flex;
  width: 1200px;
  margin: 0 auto;
  transition: all 0.5s ease-in-out;

  @media (max-width: 650px) {
    flex-direction: column;
  }
`;

export default Profile;
