import { StListWrapper } from "../MyPagePosts.styles";

const WishList = ({ title }: { title: string }) => {
  return (
    <StListWrapper>
      <h2>{title}</h2>
    </StListWrapper>
  );
};

export default WishList;
