import { useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../redux/config/configStore";
import { setCategory } from "../../redux/modules/profileSlice";
import EditProfile from "../UserProfile/EditProfile/EditProfile";
import { StListWrapper } from "./MyPagePosts.styles";
import PostList from "./PostList/PostList";

const MyPagePosts = () => {
  const dispatch = useAppDispatch();
  const [activeTitle, setActiveTitle] = useState("내 게시물");

  const categories = [
    {
      id: 1,
      category_title: "내 게시물",
    },
    {
      id: 2,
      category_title: "찜한 목록",
    },
    {
      id: 3,
      category_title: "프로필 수정",
    },
  ];

  const onClickCategoryHandler = (title: string) => {
    dispatch(setCategory(title));
    setActiveTitle(title);
  };

  return (
    <StPostContainer>
      <StPostWrapper>
        <StCategoryWrapper>
          {categories.map((category) => (
            <StCategory
              isActive={activeTitle === category.category_title}
              key={category.id}
              onClick={() => onClickCategoryHandler(category.category_title)}
            >
              {category.category_title}
            </StCategory>
          ))}
        </StCategoryWrapper>
        <StListWrapper>
          {activeTitle === "내 게시물" && <PostList title={activeTitle} />}
          {activeTitle === "찜한 목록" && <PostList title={activeTitle} />}
          {activeTitle === "프로필 수정" && <EditProfile title={activeTitle} />}
        </StListWrapper>
      </StPostWrapper>
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  display: flex;
  width: 100%;
`;

const StPostWrapper = styled.div`
  display: flex;
  gap: 1rem;
  width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 18rem;
  min-width: 10rem;
  padding: 1rem;
  font-size: medium;

  span {
    cursor: pointer;
  }
`;

const StCategory = styled.span<{ isActive: boolean }>`
  display: flex;
  padding: 1rem;
  background-color: ${({ isActive }) => (isActive ? "#023e7d" : "transparent")};
  color: ${({ isActive }) => (isActive ? "#fff" : "#222")};
  transition: all 0.3s ease-in-out;
  border-radius: 0.25rem;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#023e7d" : "#d9d9d9")};
  }
`;

export default MyPagePosts;
