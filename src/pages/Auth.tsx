import { useState } from "react";
import { styled } from "styled-components";
import LoginForm from "../components/login/LoginForm";

const Auth = () => {
  const [mode, setMode] = useState("로그인");

  return (
    <StAuthContainer>
      <LoginForm mode={mode} setMode={setMode} />
    </StAuthContainer>
  );
};

const StAuthContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: var(--main-color);
`;

export default Auth;
