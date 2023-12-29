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
      console.log("@@@@");
      setIsLogin(false);
    }
  }, []);

  useEffect(() => {
    socialSignUp();
  }, []);

  // 소셜 로그인일 때 최초 로그인시 회원가입
  const socialSignUp = async () => {
    if (userData?.user.user_metadata) {
      console.log(userData?.user);

      const socialData = userData?.user.user_metadata;

      const { data, error } = await supabase.from("user_info").upsert({
        user_id: userData?.user.id,
        nickname: socialData.user_name,
        created_at: userData?.user.created_at,
        profile_image: socialData.avatar_url,
        user_email: socialData.email,
      });

      setIsLogin(true);

      if (error) {
        console.log("소셜로그인 회원가입 중 에러", error.message);
      }
    }
  };

  const signIn = () => {
    navigate("/login");
  };

  const signOut = async () => {
    console.log("실행");
    const { error } = await supabase.auth.signOut();
    setIsLogin(false);
    alert("로그아웃 되었습니다.");
    navigate("/");
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

  user-select: none;
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
  p {
    cursor: pointer;
  }
`;
