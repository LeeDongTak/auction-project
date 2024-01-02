import { Spin } from "antd";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { styled } from "styled-components";
import { supabase } from "../supabase";
import { useCustomModal } from "../hooks/useCustomModal";

const AuthLayout = () => {
  const { handleOpenCustomModal } = useCustomModal();
  const [loading, setLoading] = useState(true);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (data && data.user) {
          setIsLogin(true);
        }

        if (error) {
          throw error;
        }
      } catch (error) {
        console.error("에러가 발생했습니다", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  if (loading)
    return (
      <StLoading>
        <Spin tip="Loading" size="large"></Spin>
      </StLoading>
    );

  if (!isLogin) {
    (async () => {
      await handleOpenCustomModal(
        "로그인이 필요한 페이지입니다.\n 로그인 페이지로 이동합니다!",
        "alert"
      );
    })();
    return <Navigate to={"/login"} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

const StLoading = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

export default AuthLayout;
