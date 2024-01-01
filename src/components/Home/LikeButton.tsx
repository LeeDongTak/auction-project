import React from "react";
import { styled } from "styled-components";

interface LikeButtonProps {
  isLiked: boolean;
  onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => {
  return (
    <StLikeBtn onClick={onLike}>
      {isLiked ? "❤️" : "🤍"} {/* 좋아요 상태에 따라 아이콘 표시 */}
    </StLikeBtn>
  );
};

export default LikeButton;

const StLikeBtn = styled.button`
  border: none;
  font-size: 2rem;
  background-color: transparent;
  position: absolute;
  bottom: 5px;
  right: 0;
`;
