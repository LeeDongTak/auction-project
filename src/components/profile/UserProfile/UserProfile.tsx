import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { User_info } from "../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../common/Avatar";

type AvatarShapeType = "circle" | "square";

interface ProfileProps {
  user: User_info;
  userAllPostsLength: number;
}

const UserProfile: React.FC<ProfileProps> = ({ user, userAllPostsLength }) => {
  const [isLoading, setIsLoading] = useState(true);

  const [avatarShape, setAvatarShape] = useState<AvatarShapeType>("circle");

  const createAt = dayjs(user?.created_at).format("YY-MM-DD");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StProfileContainer>
      <StProfileWrapper key={user?.user_id}>
        {isLoading ? (
          <Skeleton.Avatar active shape={avatarShape} size={120} />
        ) : (
          <ProfileAvatar
            src={user?.profile_image as string}
            alt="user-image"
            size="10rem"
          />
        )}
        <Skeleton loading={isLoading} active title paragraph={{ rows: 2 }}>
          <StInfoBox>
            <h3>{user?.nickname || "new user"}</h3>
            <p>
              <span>가입일: {createAt}</span>{" "}
              <span>작성글 수: {userAllPostsLength}</span>
            </p>
          </StInfoBox>
        </Skeleton>
      </StProfileWrapper>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  width: 100%;
  background-color: #333;
  height: 200px;
  min-height: 200px;
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
  height: 200px;
  min-height: 200px;
  background-color: #333;
`;

export default UserProfile;
