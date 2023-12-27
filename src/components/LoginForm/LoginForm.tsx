import { QueryClient, useMutation } from "@tanstack/react-query";
import { Button } from "antd";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { setUserInfo } from "../../api/auth";
import { supabase } from "../../supabase";
import { User_info } from "../../types/databaseRetrunTypes";

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
  const queryClient = new QueryClient();

  const insertMutation = useMutation({
    mutationFn: setUserInfo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
      value: 4,
      message: "최소 4자를 입력해주세요.",
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
      value: 1,
      message: "최소 1자를 입력해주세요.",
    },
    maxLength: {
      value: 10,
      message: "최대 10자까지 입력하실 수 있습니다.",
    },
  };

  const nickname = {
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

      console.log(email, password);

      if (error) {
        alert("아이디 또는 비밀번호를 확인해주세요");
      } else {
        alert("성공적으로 로그인 되었습니다!");
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
        console.log(error);
        alert("아이디와 비밀번호를 확인해주세요");
      } else {
        const newUserInfo: User_info = {
          user_id: user?.id as string,
          created_at: user?.created_at as string,
          user_email: user?.email as string,
          address1,
          address2,
          nickname,
          profile_image: undefined,
        };
        console.log(newUserInfo);

        insertMutation.mutate(newUserInfo);

        alert("회원가입 되었습니다. 로그인 페이지로 이동합니다.");

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
                  {...register("nickname", nickname)}
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
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(signInHandler)}
              >
                로그인하기
              </Button>
              <p>
                아직 계정이 없으신가요?{" "}
                <span onClick={onClickHandler}>회원가입</span>
              </p>
            </>
          ) : (
            <>
              <Button
                type="primary"
                htmlType="submit"
                onClick={handleSubmit(signUpHandler)}
              >
                회원가입하기
              </Button>
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

const StFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  margin: auto;
  width: 650px;
  max-width: 650px;
  margin-top: 50px;

  h2 {
    font-size: large;
    font-weight: 600;
    margin-bottom: 1.25rem;
  }
`;

const FormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  gap: 1rem;
  background-color: #eee;
  padding: 2rem;
  min-height: 400px;
`;

const StInputSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: aliceblue; */
  width: 100%;

  input {
    width: 300px;
    padding: 0.5rem;
    margin: 0.5rem 0;
  }
`;

const StButtonSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;

  span {
    cursor: pointer;
    font-size: small;
    font-weight: 500;
  }
`;

export default LoginForm;
