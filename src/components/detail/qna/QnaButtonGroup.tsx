import React from "react";
import { styled } from "styled-components";
import { Event } from "./QuestionCard";

interface Props {
  isUpdateState: boolean;
  isUpdateStateHandler: () => void;
  updateHandler: (e: Event) => Promise<void>;
  deleteHandler: (e: Event) => Promise<void>;
}
const QnaButtonGroup = ({
  isUpdateState,
  isUpdateStateHandler,
  updateHandler,
  deleteHandler,
}: Props) => {
  return (
    <StButtonWrapper>
      {isUpdateState ? (
        <>
          <StDeleteButton onClick={isUpdateStateHandler}>
            <span>취소</span>
          </StDeleteButton>
          <StUpdateButton onClick={updateHandler}>
            <span>완료</span>
          </StUpdateButton>
        </>
      ) : (
        <>
          <StDeleteButton onClick={deleteHandler}>
            <span>삭제</span>
          </StDeleteButton>
          <StUpdateButton onClick={isUpdateStateHandler}>
            <span>수정</span>
          </StUpdateButton>
        </>
      )}
    </StButtonWrapper>
  );
};

const StButtonWrapper = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  display: flex;
  gap: 10px;
  > button {
    cursor: pointer;
    width: 80px;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    background-color: unset;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
    transition: all 0.2s ease-in;
    display: flex;
    align-items: center;
    justify-content: center;
    > span {
      margin-top: 2px;
    }
    &:hover {
      box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);

      color: white;
    }
  }
`;

const StDeleteButton = styled.button`
  &:hover {
    background-color: #e84118;
  }
`;
const StUpdateButton = styled.button`
  &:hover {
    background-color: var(--main-color);
  }
`;
export default QnaButtonGroup;
