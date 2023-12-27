import { styled } from "styled-components";

const MyPageCategory = () => {
  // 카테고리 불러오기
  return (
    <StCategoryWrapper>
      <li>category1</li>
      <li>category2</li>
      <li>category3</li>
      <li>category4</li>
    </StCategoryWrapper>
  );
};

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem;
  font-size: small;
  background-color: #999;
`;
export default MyPageCategory;
