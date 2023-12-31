import { styled } from "styled-components";

interface ButtonProps {
  text: string;
  onClickHandler: () => void;
  width?: string;
  height?: string;
  mode?: string;
}

const Button = ({ text, onClickHandler, mode = "default" }: ButtonProps) => {
  return (
    <StButton onClick={onClickHandler} mode={mode}>
      {text}
    </StButton>
  );
};

const StButton = styled.button<{ mode: string }>`
  padding: 0.5rem 1.5rem;
  font-size: medium;
  font-weight: 500;
  border-radius: 0.5rem;
  background-color: ${({ mode }) => (mode === "default" ? "#fff" : "#023e7d")};
  color: ${({ mode }) => (mode === "default" ? "#023e7d" : "#fff")};
  border: ${({ mode }) => (mode === "default" ? "#023e7d" : "transparent")};
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${({ mode }) =>
      mode === "default" ? "#023e7d" : "#fff"};
    color: ${({ mode }) => (mode === "default" ? "#fff" : "#023e7d")};
  }
`;

export default Button;
