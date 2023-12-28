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
    <div>
      <div onClick={onGoogleLoginHandler}>google</div>
      <div onClick={onGitHubLoginHandler}>GitHub</div>
      <div onClick={onKakaoLoginHandler}>Kakao</div>

      {/* <Auth
        supabaseClient={supabase}
        providers={["github"]}
        queryParams={{
          access_type: "offline",
          prompt: "consent",
          hd: "domain.com",
        }}
        onlyThirdPartyProviders
      />
      <Auth
        supabaseClient={supabase}
        providers={["kakao"]}
        queryParams={{
          access_type: "offline",
          prompt: "consent",
          hd: "domain.com",
        }}
        onlyThirdPartyProviders
      /> */}
    </div>
  );
};

export default SocialLogin;
