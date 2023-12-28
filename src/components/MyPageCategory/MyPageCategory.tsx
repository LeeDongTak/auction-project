import { styled } from "styled-components";

const MyPageCategory = () => {
  // 카테고리 불러오기
  return (
    <StCategoryWrapper>
      <li>내가 게시한 물품</li>
      <li>내가 참여한 경매</li>
      <li>찜한 목록</li>
      <li>프로필 수정</li>
    </StCategoryWrapper>
  );
};

const StCategoryWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 10rem;
  padding: 1rem;
  font-size: small;
`;
export default MyPageCategory;
