import React from "react";
import { styled } from "styled-components";
import unlikedImage from "../../images/heart.svg";
import likedImage from "../../images/heart2.svg";

interface LikeButtonProps {
  isLiked: boolean;
  onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => {
  return (
    <StLikeBtn onClick={onLike}>
      <img src={isLiked ? likedImage : unlikedImage} alt="like-icon" />
      {/* 좋아요 상태에 따라 아이콘 표시 */}
    </StLikeBtn>
  );
};

export default LikeButton;

const StLikeBtn = styled.button`
  border: none;

  background-color: transparent;
  position: absolute;
  bottom: 5px;
  right: 0;
  img {
    width: 30px !important;
  }
`;
