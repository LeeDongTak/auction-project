import { styled } from "styled-components";
import MyPageCategory from "../MyPageCategory/MyPageCategory";
import PostList from "./PostList/PostList";

interface Props {
  userId: string;
}

const MyPagePosts = ({ userId }: Props) => {
  return (
    <StPostContainer>
      <MyPageCategory />
      <PostList />
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
  background-color: #eee;
`;

export default MyPagePosts;
