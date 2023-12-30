import { UserOutlined } from "@ant-design/icons";
import { Avatar, Skeleton } from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { styled } from "styled-components";
import { User_info } from "../../types/databaseRetrunTypes";

type AvatarShapeType = "circle" | "square";

interface ProfileProps {
  user: User_info;
  isLoading: boolean;
}

const UserProfile: React.FC<ProfileProps> = ({ user, isLoading }) => {
  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>("circle");

  const createAt = dayjs(user?.created_at).format("YY-MM-DD");

  console.log(createAt);

  if (isLoading)
    return (
      <StSkeleton>
        <Skeleton.Avatar active shape={avatarShape} size={80} />
        <Skeleton.Input active />
      </StSkeleton>
    );

  return (
    <StProfileContainer>
      <StProfileWrapper key={user.user_id}>
        {user.profile_image ? (
          <StImgBox>
            <img src={user.profile_image} alt="user-image" />
          </StImgBox>
        ) : (
          <Avatar shape="circle" size={64} icon={<UserOutlined />} />
        )}
        <StInfoBox>
          <h3>{user.nickname || "new user"}</h3>
          <p>
            <span>가입일: {createAt}</span> <span>작성글 수: 00</span>
          </p>
        </StInfoBox>
      </StProfileWrapper>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #222;
  height: 200px;
  align-items: center;
`;

const StProfileWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  margin: 0 auto;
  width: 1200px;
  gap: 4rem;
  padding: 2rem;
  color: #fff;
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const StInfoBox = styled.div`
  h3 {
    font-size: xx-large;
  }

  p {
    display: flex;
    gap: 1.5rem;
    margin: 1.5rem 0;
    color: #777;
  }
`;

const StSkeleton = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem;
  gap: 1.5rem;
`;

export default UserProfile;
