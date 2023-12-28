import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../api/auth";

type AvatarShapeType = "circle" | "square";

const UserProfile = () => {
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>("circle");

  const userData = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );
  const userId = userData.user.id;

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
      <StImgBox>
        <img src="" alt="img" />
      </StImgBox>
      {user?.map((item) => <p>{item.nickname}</p>)}
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
`;

const StSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export default UserProfile;
