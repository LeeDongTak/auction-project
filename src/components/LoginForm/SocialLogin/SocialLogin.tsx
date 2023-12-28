import { styled } from "styled-components";
import { supabase } from "../../../supabase";

const SocialLogin = () => {
  const onGoogleLoginHandler = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
  };

  const onGitHubLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  const onKakaoLoginHandler = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "kakao",
    });
  };

  return (
    <StSocialLoginWrapper>
      <span onClick={onGoogleLoginHandler}>google</span>
      <span onClick={onGitHubLoginHandler}>GitHub</span>
      <span onClick={onKakaoLoginHandler}>Kakao</span>
    </StSocialLoginWrapper>
  );
};

const StSocialLoginWrapper = styled.section`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;

export default SocialLogin;
