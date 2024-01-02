import { QueryClient, useMutation } from "@tanstack/react-query";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../api/auth";
import { QUERY_KEYS } from "../../query/keys.constant";
import { useAppDispatch } from "../../redux/config/configStore";
import { supabase } from "../../supabase";
import { User_info } from "../../types/databaseRetrunTypes";
import {
  FormWrapper,
  StButton,
  StButtonSection,
  StFormContainer,
  StInputSection,
} from "./LoginForm.styles";
import SocialLogin from "./SocialLogin/SocialLogin";
import { useCustomModal } from "../../hooks/useCustomModal";

interface SignFormProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

type FormValues = {
  email: string;
  password: string;
  address1?: string;
  address2?: string;
  nickname?: string;
};

const LoginForm: React.FC<SignFormProps> = ({ mode, setMode }) => {
  const dispatch = useAppDispatch();
  const { handleOpenCustomModal } = useCustomModal();

  const queryClient = new QueryClient();

  const insertMutation = useMutation({
    mutationFn: addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USERS] });
    },
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({ mode: "onChange" });

  console.log("errors", errors);

  const onSubmit: SubmitHandler<FieldValues> = ({ email, password }) => {
    if (mode === "로그인") {
      signInHandler({ email, password });
    } else {
      signUpHandler({ email, password });
    }

    reset();
  };

  const userEmail = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 4,
      message: "최소 4자를 입력해주세요.",
    },
    maxLength: {
      value: 20,
      message: "최대 20자까지 입력하실 수 있습니다..",
    },
  };

  const userPassword = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 8,
      message: "최소 8자를 입력해주세요.",
    },
    maxLength: {
      value: 15,
      message: "최대 15자까지 입력하실 수 있습니다.",
    },
  };

  const confirmPassword = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 4,
      message: "최소 4자를 입력해주세요.",
    },
    maxLength: {
      value: 15,
      message: "최대 15자까지 입력하실 수 있습니다.",
    },
  };

  const userAddress = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 3,
      message: "주소의 길이가 너무 짧습니다.",
    },
    maxLength: {
      value: 20,
      message: "최대 20자까지 입력하실 수 있습니다.",
    },
  };

  const userNickname = {
    required: "필수 입력란입니다.",
    minLength: {
      value: 1,
      message: "최소 1자를 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "최대 10자까지 입력하실 수 있습니다.",
    },
  };

  const signInHandler = async ({ email, password }: FormValues) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        await handleOpenCustomModal(
          "아이디와 비밀번호를 확인해주세요",
          "alert"
        );
      } else {
        await handleOpenCustomModal("성공적으로 로그인 되었습니다!", "alert");
        navigate("/");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpHandler = async ({
    email,
    password,
    address1,
    address2,
    nickname,
  }: FormValues) => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        await handleOpenCustomModal(
          "아이디와 비밀번호를 확인해주세요.",
          "alert"
        );
      } else {
        const newUserInfo: User_info = {
          user_id: user?.id as string,
          created_at: user?.created_at as string,
          user_email: user?.email as string,
          address1,
          address2,
          nickname,
          profile_image: "/user_img.jpeg",
        };

        insertMutation.mutate(newUserInfo);

        await handleOpenCustomModal(
          "회원가입 되었습니다. 로그인 페이지로 이동합니다.",
          "alert"
        );
        setMode("로그인");
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickHandler = () => {
    if (mode === "로그인") {
      setMode("회원가입");
      reset();
    }
    if (mode === "회원가입") {
      setMode("로그인");
      reset();
    }
  };

  return (
    <StFormContainer>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <h2>{mode === "로그인" ? "로그인" : "회원가입"}</h2>
        <StInputSection>
          <div>
            <input
              type="email"
              placeholder="이메일"
              {...register("email", userEmail)}
            />
            {errors?.email && ( // 에러 메시지
              <div>{errors?.email?.message as string}</div>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="비밀번호"
              {...register("password", userPassword)}
            />
            {errors?.password && ( // 에러 메시지
              <div>{errors?.password?.message as string}</div>
            )}
          </div>
          {mode === "회원가입" && (
            <>
              <div>
                <input
                  type="nickname"
                  placeholder="닉네임"
                  {...register("nickname", userNickname)}
                />
                {errors?.nickname && ( // 에러 메시지
                  <div>{errors?.nickname?.message as string}</div>
                )}
              </div>
              <div>
                <input
                  type="address1"
                  placeholder="주소"
                  {...register("address1", userAddress)}
                />
                {errors?.address1 && ( // 에러 메시지
                  <div>{errors?.address1?.message as string}</div>
                )}
              </div>

              <div>
                <input
                  type="address2"
                  placeholder="상세주소"
                  {...register("address2", userAddress)}
                />
                {errors?.address2 && ( // 에러 메시지
                  <div>{errors?.address2?.message as string}</div>
                )}
              </div>
            </>
          )}
        </StInputSection>

        <StButtonSection>
          {mode === "로그인" ? (
            <>
              <SocialLogin />
              <StButton
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(signInHandler)}
              >
                로그인하기
              </StButton>
              <p>
                아직 계정이 없으신가요?{" "}
                <span onClick={onClickHandler}>회원가입</span>
              </p>
            </>
          ) : (
            <>
              <StButton
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(signUpHandler)}
              >
                회원가입하기
              </StButton>
              <p>
                이미 계정이 있으신가요?{" "}
                <span onClick={onClickHandler}>로그인</span>{" "}
              </p>
            </>
          )}
        </StButtonSection>
      </FormWrapper>
    </StFormContainer>
  );
};

export default LoginForm;
