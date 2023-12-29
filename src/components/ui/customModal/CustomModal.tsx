import { styled } from "styled-components";
import { useSelector } from "react-redux";
import {
  closeCustomModal,
  selectorCustomModal,
  setCustomModalResult,
} from "../../../redux/modules/customModalSlice";
import CloseButton from "../CloseButton";
import React, { useEffect } from "react";
import { useAppDispatch } from "../../../redux/config/configStore";
import { Spacer } from "../Spacer";

const CustomModal = () => {
  const dispatch = useAppDispatch();
  const { modalType, message } = useSelector(selectorCustomModal);

  useEffect(() => {
    return () => {
      setCustomModalResult(false);
    };
  }, []);

  const onClickCloseModalHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(closeCustomModal());
    }
  };

  const onClickConfirmHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(setCustomModalResult(true));
      dispatch(closeCustomModal());
    }
  };

  const onClickCancelHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (e.target === e.currentTarget) {
      dispatch(setCustomModalResult(false));
      dispatch(closeCustomModal());
    }
  };

  return (
    <StCustomModalWrapper onClick={onClickCloseModalHandler}>
      <StCustomModalContent>
        <StModalMessageWrapper>
          <h1>{message}</h1>
        </StModalMessageWrapper>
        <Spacer y={40} />
        <StButtonWrapper>
          {modalType === "confirm" && (
            <StCancelButton onClick={onClickCancelHandler}>취소</StCancelButton>
          )}
          <StConfirmButton onClick={onClickConfirmHandler}>
            확인
          </StConfirmButton>
        </StButtonWrapper>
        <CloseButton handler={onClickCloseModalHandler} />
      </StCustomModalContent>
    </StCustomModalWrapper>
  );
};

const StCustomModalWrapper = styled.div`
  display: flex;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(15px);
`;

const StCustomModalContent = styled.div`
  width: 500px;
  height: 250px;
  background-color: white;
  margin: auto;
  position: relative;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StModalMessageWrapper = styled.div`
  font-size: 30px;
  font-weight: bold;
`;
const StButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
  > button {
    width: 70px;
    height: 40px;
    color: white;
    border: unset;
    cursor: pointer;
    border-radius: 5px;
  }
`;

const StConfirmButton = styled.button`
  background-color: black;
  &:hover {
    background-color: #bdc3c7;
  }
`;

const StCancelButton = styled.button`
  background-color: #e84118;
  &:hover {
    background-color: #f5b7b1;
  }
`;

export default CustomModal;
