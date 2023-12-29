import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { supabase } from "../../supabase";
import Nav from "./Nav";

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
    <StHeaderContainer>
      <StHeaderWrapper>
        <h1 onClick={() => navigate("/")}>ELETE</h1>
        <div>
          {isLogin ? (
            <>
              <Nav signOut={signOut} userId={userData?.user.id} />
            </>
          ) : (
            <>
              <button onClick={signIn}>로그인</button>
            </>
          )}
        </div>
      </StHeaderWrapper>
    </StHeaderContainer>
  );
}

export default Header;

const StHeaderContainer = styled.div`
  display: flex;
  width: 100%;
  height: 7rem;
  background-color: var(--main-color);
  color: #fff;
`;

const StHeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 1200px;
  margin: 0 auto;
  font-size: 1.5rem;
  font-weight: bold;
  user-select: none;
  padding: 15px 20px;

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

    img > {
      width: 10px;
      cursor: pointer;
    }
  }
  h1 {
    font-size: xx-large;
  }

  p {
    cursor: pointer;
  }
`;
