import React from "react";
import { FcAreaChart } from "react-icons/fc";
import { styled } from "styled-components";

interface Props {
  forwardHandler: (e: React.MouseEvent<HTMLElement>) => void;
}
const PopupToggleButton = ({ forwardHandler }: Props) => {
  return (
    <StPopupToggleButtonWrapper onClick={forwardHandler}>
      <StFcAreaChart />
    </StPopupToggleButtonWrapper>
  );
};
const StPopupToggleButtonWrapper = styled.button`
  position: fixed;
  width: 50px;
  height: 50px;
  bottom: 100px;
  right: 50px;
  cursor: pointer;
  background-color: unset;
  border: unset;
  border-radius: 50%;
  &:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
  }
`;

const StFcAreaChart = styled(FcAreaChart)`
  width: 100%;
  height: 100%;
`;

export default PopupToggleButton;
