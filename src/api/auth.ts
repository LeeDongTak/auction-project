import { supabase } from "../supabase";
import { User_info } from "../types/databaseRetrunTypes";

interface Inputs {
  email: string;
  password: string;
}

const signUp = async ({ email, password }: Inputs) => {
  const response = await supabase.auth.signUp({
    email,
    password,
  });

  return response;
};

// 유저 데이터 불러오기
const getUserInfo = async () => {
  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .returns<User_info[]>();

  return data;
};

// 유저 데이터 추가하기
const setUserInfo = async (payload: User_info) => {
  console.log(payload);

  const { data, error } = await supabase
    .from("user_info")
    .insert(payload)
    .select();

  console.log("setUserInfo ", error);
  console.log("setUserInfo ", data);
};

export { signUp, getUserInfo, setUserInfo };
