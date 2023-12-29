import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../images/logo2.png";
import search from "../../images/search.svg";
import { supabase } from "../../supabase";

function Header() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const userData = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  const socialData = userData?.user.user_metadata;

  useEffect(() => {
    if (userData?.access_token) {
      socialSignUp();
      setIsLogin(true);
    } else {
      console.log("@@@@");
      setIsLogin(false);
    }
  }, []);

  // 최초 소셜 로그인시 회원가입
  const socialSignUp = async () => {
    try {
      if (socialData) {
        const { data, error } = await supabase.from("user_info").upsert({
          user_id: userData?.user.id,
          nickname: socialData.user_name,
          created_at: userData?.user.created_at,
          profile_image: socialData.avatar_url,
          user_email: socialData.email,
        });

        if (error) {
          console.log("소셜로그인 회원가입 실패", error.message);
        }
      }
    } catch (error) {
      console.log("소셜 회원가입 중 오류 발생", error);
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
      <p onClick={() => navigate("/")}>
        <img src={logo} />
        &nbsp; 엘리트옥션
      </p>
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
  background-color: #023e7d;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  color: #fff;
  user-select: none;
  justify-content: space-between;
  padding: 15px 20px;
  align-items: center;

  button {
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 5px;
    color: #fff;
    cursor: pointer;
    background-color: #023e7d;
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
    vertical-align: middle;
  }
  p {
    cursor: pointer;
  }
`;
