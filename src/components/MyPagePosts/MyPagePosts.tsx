import { useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../redux/config/configStore";
import { setCategory } from "../../redux/modules/profileSlice";
import EditProfile from "../UserProfile/EditProfile/EditProfile";
import PostList from "./PostList/PostList";
import WishList from "./WishList/WishList";

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
      {activeTitle === "내 게시물" && <PostList title={activeTitle} />}
      {activeTitle === "찜한 목록" && <WishList title={activeTitle} />}
      {activeTitle === "프로필 수정" && <EditProfile title={activeTitle} />}
    </StPostContainer>
  );
};

const StPostContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  padding: 0 1rem;
`;

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  padding: 1rem;
  font-size: small;

  span {
    cursor: pointer;
  }
`;

const StCategory = styled.span<{ isActive: boolean }>`
  display: flex;
  padding: 0.5rem;
  background-color: ${({ isActive }) => (isActive ? "#999" : "transparent")};
  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: ${({ isActive }) => (isActive ? "#999" : "#d9d9d9")};
  }
`;

export default MyPagePosts;
