import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import search from "../../images/search.svg";
import { supabase } from "../../supabase";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const accessToken = localStorage.getItem("accessToken");
  console.log(accessToken);

  const signIn = () => {
    navigate("/login");
  };

  const signOut = async () => {
    console.log("실행");
    const { error } = await supabase.auth.signOut();
    console.log(error);
  };

  console.log(isLogin);

  return (
    <StHeader>
      <p onClick={() => navigate("/")}>엘리트옥션</p>
      <div>
        <img src={search} />
        {!!accessToken ? (
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
  margin-bottom: 20px;
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
