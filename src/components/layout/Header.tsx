import { QueryClient, useQuery } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect, useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { getUserInfo } from "../../api/auth";
import { useCustomModal } from "../../hooks/useCustomModal";
import useGetAuthInfo from "../../hooks/useGetAuthInfo";
import { QUERY_KEYS } from "../../query/keys.constant";
import { useSocialUserAddMutation } from "../../query/useUsersQuery";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { toggleViewSearchModal } from "../../redux/modules/searchSlice";
import { supabase } from "../../supabase";
import { User_info } from "../../types/databaseRetrunTypes";
import { Auth } from "../../types/userType";
import DefaultButton from "../common/Button";
import Search from "../search/Search";
import Nav from "./Nav";

const defaultProfileImg = "user_img.jpeg";

function Header() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { viewSearchModal } = useAppSelector((state) => state.search);

  const [isLogin, setIsLogin] = useState(false);

  const [toggleSearch, setToggleSearch] = useState(false);

  const { handleOpenCustomModal } = useCustomModal();

  const queryClient = new QueryClient();

  const user: Auth | null = useGetAuthInfo();

  const userId = user?.user?.id;

  const socialData = user?.user?.user_metadata;

  const { mutate: addSocialUserMutate } = useSocialUserAddMutation();

  const { data: currentUser, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserInfo(userId as string),
    enabled: !!userId,
  });

  useEffect(() => {
    if (user?.access_token) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      socialSignUp();
    }
  }, []);

  // 최초 소셜 로그인시 회원가입
  const socialSignUp = async () => {
    try {
      if (user && user.user && socialData) {
        const newUser: User_info = {
          user_id: user.user.id,
          nickname: socialData.name,
          created_at: user.user.created_at,
          profile_image: socialData.avatar_url,
          user_email: socialData.email,
        };

        addSocialUserMutate(newUser, {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
          },
        });
      }
    } catch (error) {
      console.log("소셜 회원가입 중 오류 발생", error);
    }
  };

  const signIn = () => {
    navigate("/login");
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      setIsLogin(false);
      await handleOpenCustomModal("로그아웃 되었습니다.", "alert");
      navigate("/");

      if (error) {
        console.error("Supabase signOut error:", error);
        await handleOpenCustomModal(
          "로그아웃 중 오류가 발생했습니다.",
          "alert"
        );
      }
    } catch (error) {
      console.error("Sign out process error:", error);
      await handleOpenCustomModal("로그아웃 중 오류가 발생했습니다.", "alert");
    }
  };

  const toggleSearchModal = () => {
    setToggleSearch((prev) => !prev);
    dispatch(toggleViewSearchModal(toggleSearch));
  };

  return (
    <StHeaderContainer>
      <StHeaderWrapper>
        <h1 onClick={() => navigate("/")}>ELITE</h1>

        {isLoading ? (
          <Spin />
        ) : (
          <div>
            {!viewSearchModal && (
              <StSearchButton onClick={toggleSearchModal}>
                <MdOutlineSearch />
              </StSearchButton>
            )}
            {isLogin ? (
              <>
                <Nav signOut={signOut} userId={user?.user.id} />
              </>
            ) : (
              <DefaultButton onClickHandler={signIn} text="로그인" />
            )}
          </div>
        )}
      </StHeaderWrapper>
      <Search />
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

  div {
    display: flex;
    gap: 2rem;

    img > {
      width: 10px;
      cursor: pointer;
    }
  }

  h1 {
    font-size: xx-large;
    cursor: pointer;
  }

  p {
    cursor: pointer;
  }
`;

const StSearchButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: xx-large;
  height: 4rem;
  width: 4rem;
  border-radius: 50%;
  background-color: transparent;
  border: none;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;
