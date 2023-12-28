import React, { useEffect, useState } from "react";
import { fetchGetCategories } from "../../api/auction";
import { Category } from "../../types/databaseRetrunTypes";

// CategorySelector 컴포넌트의 프로퍼티 타입 정의
interface CategorySelectorProps {
  onCategorySelect: (category: Category) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({
  onCategorySelect,
}) => {
  // 카테고리 목록 State
  const [categories, setCategories] = useState<Category[]>([]);

  // 컴포넌트 마운트 시 카테고리 목록 불러오기
  useEffect(() => {
    // 카테고리 목록을 비동기적으로 가져오는 함수
    const loadCategories = async () => {
      const categoriesData = await fetchGetCategories();
      // 가져온 데이터로 상태 업데이트
      setCategories(categoriesData);
    };
    // 함수 호출
    loadCategories();
  }, []);

  return (
    <div>
      {categories.map((category) => (
        <button
          key={category.category_id}
          onClick={() => onCategorySelect(category)}
        >
          {category.category_name}
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;
