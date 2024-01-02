import { Button } from "antd";
import { styled } from "styled-components";

const StFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  width: 650px;
  height: 550px;

  h2 {
    font-size: x-large;
    font-weight: 600;
    margin-bottom: 1.25rem;
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
`;

const StInputSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: aliceblue; */
  width: 100%;

  input {
    width: 300px;
    padding: 0.5rem;
    margin: 0.5rem 0;
    font-size: medium;
  }
`;

const StButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;

  p {
    font-size: small;
  }

  span {
    cursor: pointer;
    font-size: medium;
    font-weight: 500;
  }
`;

const StButton = styled(Button)`
  text-align: center;
  height: 3rem;
  width: 300px;
`;

export {
  StFormContainer,
  FormWrapper,
  StInputSection,
  StButtonSection,
  StButton,
};
