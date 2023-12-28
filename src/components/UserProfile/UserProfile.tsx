import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar, Skeleton } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../api/auth";

type AvatarShapeType = "circle" | "square";

const UserProfile = () => {
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>("circle");

  const { user: userData } = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  const userId = userData.id;

  const socialLoginUser = userData.user_metadata;

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });

  console.log(user);

  if (isLoading)
    return (
      <StSkeleton>
        <Skeleton.Avatar active shape={avatarShape} size={70} />
        <Skeleton.Input active />
      </StSkeleton>
    );

  return (
    <StProfileContainer>
      {socialLoginUser ? (
        <>
          {socialLoginUser.avatar_url ? (
            <StImgBox>
              <img src={socialLoginUser.avatar_url} alt="user-image" />
            </StImgBox>
          ) : (
            <Avatar shape="circle" size={64} icon={<UserOutlined />} />
          )}
          <p>{socialLoginUser.user_name}</p>
        </>
      ) : (
        <>
          {user?.map((item) => (
            <>
              {item.profile_image ? (
                <StImgBox>
                  <img src="" alt="user-image" />
                </StImgBox>
              ) : (
                <Avatar shape="circle" size={64} icon={<UserOutlined />} />
              )}
              <p>{item.nickname}</p>
            </>
          ))}
        </>
      )}
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 2rem;
  font-size: 2rem;
  border: 1px solid #222;
  background-color: #eee;
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
  }
`;

const StSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export default UserProfile;
