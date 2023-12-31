import { styled } from "styled-components";

interface AvatarProps {
  src: string;
  alt: string;
  size: string;
}

const ProfileAvatar = ({ src, alt, size }: AvatarProps) => {
  return (
    <StAvatar size={size}>
      <img src={src} alt={alt} />
    </StAvatar>
  );
};

const StAvatar = styled.div<{
  size: string;
}>`
  display: flex;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  background-color: gray;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

export default ProfileAvatar;
