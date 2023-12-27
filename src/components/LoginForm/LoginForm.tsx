import { Button, Checkbox, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../supabase";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

type FieldType = {
  email?: string;
  password?: string;
  remember?: string;
};

interface SignFormProps {
  mode: string;
  setMode: React.Dispatch<React.SetStateAction<string>>;
}

const LoginForm: React.FC<SignFormProps> = ({ mode, setMode }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      // if (data.user) {
      //   console.log("data.user", data.user);
      // } else {
      //   console.log("로그인 만료");
      // }
      console.log(user);
    };
    fetchUser();
  }, []);

  const signInHandler = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: "/",
        },
      });

      console.log(email, password);

      if (error) {
        alert("아이디 또는 비밀번호를 확인해주세요");
      } else {
        alert("성공적으로 로그인 되었습니다!");
        // navigate("/");
      }

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const signUpHandler = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        // options: {
        //   emailRedirectTo: "https//example.com/welcome",
        // },
      });

      console.log(email, password);

      console.log(data);
      if (error) {
        console.log(error);
        alert("아이디와 비밀번호를 확인해주세여");
      } else {
        alert("회원가입 되었습니다. 로그인 페이지로 이동합니다.");
        setMode("로그인");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>{mode === "로그인" ? "로그인" : "회원가입"}</h2>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="email"
          name="email"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          {mode === "로그인" ? (
            <>
              <Button type="primary" htmlType="submit" onClick={signInHandler}>
                로그인하기
              </Button>
              <button onClick={() => setMode("회원가입")}>
                아직 계정이 없으신가요? 회원가입
              </button>
            </>
          ) : (
            <>
              <Button type="primary" htmlType="submit" onClick={signUpHandler}>
                회원가입하기
              </Button>
              <button onClick={() => setMode("로그인")}>
                이미 계정이 있으신가요? 로그인
              </button>
            </>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
