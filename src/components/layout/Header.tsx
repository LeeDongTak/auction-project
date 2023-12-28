import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import search from "../../images/search.svg";
import { supabase } from "../../supabase";

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const userData = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  useEffect(() => {
    if (userData?.access_token) {
      setIsLogin(true);
    } else {
      console.log("로그인 실패");
      setIsLogin(false);
    }
  }, []);

  const signIn = () => {
    navigate("/login");
  };

  const signOut = async () => {
    console.log("실행");
    const { error } = await supabase.auth.signOut();
    setIsLogin(false);
    alert("로그아웃 되었습니다.");
    console.log(error);
  };

  return (
    <StHeader>
      <p onClick={() => navigate("/")}>엘리트옥션</p>
      <div>
        <img src={search} />
        {isLogin ? (
          <button onClick={signOut}>로그아웃</button>
        ) : (
          <button onClick={signIn}>로그인</button>
        )}
      </div>
    </StHeader>
  );
}

export default Header;
const StHeader = styled.header`
  background-color: #afcaff;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  align-items: center;

  button {
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    background-color: #afcaff;
    margin-left: 10px;
    &:hover {
      background-color: #fffacd;
    }
  }
  div {
    display: flex;
  }
  img {
    width: 30px;
    cursor: pointer;
  }
`;
