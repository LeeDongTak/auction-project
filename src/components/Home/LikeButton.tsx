import React from "react";

interface LikeButtonProps {
  isLiked: boolean;
  onLike: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ isLiked, onLike }) => {
  return (
    <button onClick={onLike}>
      {isLiked ? "❤️" : "🤍"} {/* 좋아요 상태에 따라 아이콘 표시 */}
    </button>
  );
};

export default LikeButton;
