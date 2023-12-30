import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../../redux/config/configStore";
import { setCategory } from "../../../redux/modules/profileSlice";

interface MenuProps {
  activeTitle: string;
  setActiveTitle: Dispatch<SetStateAction<string>>;
}

const ProfileMenu = ({ activeTitle, setActiveTitle }: MenuProps) => {
  const dispatch = useAppDispatch();

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
  );
};

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 18rem;
  min-width: 10rem;
  padding: 1rem 0;
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

export default ProfileMenu;
