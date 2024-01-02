import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchGetCategories } from "../../api/auction";
import { Category } from "../../types/databaseRetrunTypes";
// CategorySelector 컴포넌트의 props 타입 정의
interface CategorySelectorProps {
  // 카테고리 선택 시 실행될 함수
  onCategorySelect: (category: Category) => void;
  // 선택된 카테고리 목록
  selectedCategories: Category[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onCategorySelect,
  selectedCategories,
}) => {
  // 사용 가능한 카테고리 목록을 저장하는 State
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    // 카테고리 데이터를 로드하고 상태에 저장하는 함수
    const loadCategories = async () => {
      const categoriesData = await fetchGetCategories();
      setCategories(categoriesData);
    };
    loadCategories();
  }, []);

  return (
    <StCategoryWrapper>
      <StCategoryContainer>
        {categories.map((category) => (
          // 각 카테고리에 대한 버튼을 렌더링하고 버튼 클릭 시 onCategorySelect 함수 실행
          <button
            key={category.category_id}
            onClick={() => onCategorySelect(category)}
            style={{
              backgroundColor: selectedCategories.some(
                (c) => c.category_id === category.category_id
              )
                ? "#fffacd"
                : "transparent",
            }}
          >
            {category.category_name}
          </button>
        ))}
      </StCategoryContainer>
    </StCategoryWrapper>
  );
};

export default CategorySelector;

const StCategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  user-select: none;
  flex-wrap: wrap;
  margin-bottom: 20px;
  button {
    width: 130px;
    height: 50px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 1.5rem;
    border: 2px solid #023e7d;
    margin: 10px;
    &:hover {
      background-color: #fffacd !important;
    }
  }
`;

const StCategoryWrapper = styled.div``;
