import { styled } from "styled-components";
import { Auction_post } from "../../../../types/databaseRetrunTypes";

const PostItem = ({ post }: { post: Auction_post }) => {
  const { title, content } = post;

  const viewContent =
    content.length > 20 ? content.slice(0, 50) + "..." : content;

  return (
    <StPostItemWrapper>
      <StImage>사진</StImage>
      <StPostInfoSection>
        <h3>{post.title}</h3>
        <p>{viewContent}</p>
      </StPostInfoSection>
    </StPostItemWrapper>
  );
};

const StPostItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  border: 1px solid #222;
  padding: 1rem;
`;

const StImage = styled.div`
  width: 300px;
  height: 100px;
  background-color: #888;
`;

const StPostInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0.25rem;
  width: 100%;

  h3 {
    font-size: medium;
    font-weight: 500;
  }
`;

export default PostItem;
