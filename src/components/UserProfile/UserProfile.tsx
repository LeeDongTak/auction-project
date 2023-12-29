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

  console.log();

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

  console.log("user info", user);

  if (isLoading)
    return (
      <StSkeleton>
        <Skeleton.Avatar active shape={avatarShape} size={80} />
        <Skeleton.Input active />
      </StSkeleton>
    );

  return (
    <>
      {user?.map((item) => (
        <StProfileContainer key={item.user_id}>
          {item.profile_image ? (
            <StImgBox>
              <img src={item.profile_image} alt="user-image" />
            </StImgBox>
          ) : (
            <Avatar shape="circle" size={64} icon={<UserOutlined />} />
          )}
          <div>
            <h3>{item.nickname || "new user"}</h3>
            <p>가입일</p>
          </div>
        </StProfileContainer>
      ))}
    </>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  gap: 2rem;
  padding: 2rem;
  background-color: #222;
  color: #fff;

  h3 {
    font-size: 2rem;
  }

  p {
    margin: 1rem 0;
    color: #777;
  }
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const StSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export default UserProfile;
