import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { fetchGetCategories } from "../../api/auction";
import { Category } from "../../types/databaseRetrunTypes";
interface CategorySelectorProps {
  onCategorySelect: (category: Category) => void;
  selectedCategories: Category[];
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onCategorySelect,
  selectedCategories,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
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
          <button
            key={category.category_id}
            onClick={() => onCategorySelect(category)}
            style={{
              backgroundColor: selectedCategories.some(
                (c) => c.category_id === category.category_id
              )
                ? "#afcaff"
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
  flex-wrap: wrap;
  margin-bottom: 20px;
  button {
    width: 130px;
    height: 50px;
    font-weight: bold;
    font-size: 1.5rem;
    border: 1px solid #afcaff;
    margin: 10px;
    &:hover {
      background-color: #fffacd !important;
    }
  }
`;

const StCategoryWrapper = styled.div``;
