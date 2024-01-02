import { Button } from "antd";
import { styled } from "styled-components";

const StFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  width: 650px;
  height: 680px;

  h2 {
    font-size: xx-large;
    font-weight: 600;
    margin-bottom: 1.25rem;
    color: var(--main-color);
    font-weight: 700;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1rem;
  background-color: #eee;
  padding: 2rem;
  min-height: 400px;
  border-radius: 1rem;
  /* box-shadow: 0 0 8px 5px #222; */
  background-color: #fff;
`;

const StInputSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 1rem;

  input {
    width: 400px;
    padding: 1rem 1.5rem;
    margin: 0 auto;
    font-size: large;
    background-color: #eee;
    border: none;
    border-radius: 0.5rem;

    @media (max-width: 650px) {
      width: 300px;
    }
  }
`;

const StButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 2rem;

  p {
    font-size: medium;
    color: var(--main-color);
  }

  span {
    cursor: pointer;
    font-size: large;
    font-weight: 600;
  }
`;

const StButton = styled(Button)`
  text-align: center;
  height: 4rem;
  width: 400px;
  background-color: var(--main-color);
  opacity: 100%;
  @media (max-width: 650px) {
    width: 300px;
  }

  &:hover {
    opacity: 90%;
  }
`;

const StError = styled.p`
  color: orange;
  padding: 0.5rem;
  font-size: 1.2rem;
`;

export {
  StFormContainer,
  FormWrapper,
  StInputSection,
  StButtonSection,
  StButton,
  StError,
};
