import { useState } from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const Auth = () => {
  const [mode, setMode] = useState("로그인");

  return (
    <div>
      <LoginForm mode={mode} setMode={setMode} />
    </div>
  );
};

export default Auth;
