import { FaGithub, FaGoogle } from "react-icons/fa6";
import { SiKakaotalk } from "react-icons/si";
import { styled } from "styled-components";
import { supabase } from "../../../supabase";

const SocialLogin = () => {
  const onGoogleLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("로그인 중 오류 발생!", error.message);
    }
  };

  const onGitHubLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("로그인 중 오류 발생!", error.message);
    }
  };

  const onKakaoLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("로그인 중 오류 발생!", error.message);
    }
  };

  return (
    <StSocialLoginWrapper>
      <span onClick={onGoogleLoginHandler}>
        <FaGoogle />
      </span>
      <span onClick={onGitHubLoginHandler}>
        <FaGithub />
      </span>
      <span onClick={onKakaoLoginHandler}>
        <SiKakaotalk />
      </span>
    </StSocialLoginWrapper>
  );
};

const StSocialLoginWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 4rem;
  margin-top: 1rem;

  span {
    font-size: 4rem;
    color: var(--main-color);
  }
`;

export default SocialLogin;
