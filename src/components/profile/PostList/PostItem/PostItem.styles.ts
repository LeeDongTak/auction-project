import { Skeleton } from "antd";
import { styled } from "styled-components";

const StButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;

  button {
    width: 100px;
  }
`;

const StPostItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0px 0px 7px #d9d9d9;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    background-color: #eee;
    ${StButtonSection} {
      opacity: 100%;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 260px;
  }

  ${StButtonSection} {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
`;

const StImage = styled.div`
  width: 260px;
  height: 260px;
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    @media (max-width: 650px) {
      object-fit: contain;
    }
  }

  @media (max-width: 650px) {
    width: 250px;
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    width: 150px;
    margin-right: 1rem;
  }
`;

const StPostInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem;
  width: 100%;
  color: #333;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    h3 {
      font-size: x-large;
      font-weight: 500;
    }

    span {
      font-size: small;
      color: #888;
    }
  }

  p {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    font-size: medium;
    margin-bottom: 0.5rem;
  }
`;

const StImageSkeleton = styled(Skeleton.Image)`
  width: 400px !important;
  height: 260px !important;

  svg {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  @media (max-width: 650px) {
    width: 250px !important;
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    width: 150px !important;
    margin-right: 1rem;
  }
`;

export {
  StButtonSection,
  StPostItemWrapper,
  StImage,
  StPostInfoSection,
  StImageSkeleton,
};
