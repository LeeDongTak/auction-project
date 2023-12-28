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

// 모든 유저 데이터 불러오기
const getUsersInfo = async () => {
  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .returns<User_info[]>();

  return data;
};

// 특정 유저 데이터 불러오기
const getUserInfo = async (id: string) => {
  console.log(id);
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", id);

  console.log(user_info);
  console.log(error);

  return user_info as User_info[];
};

// 유저 데이터 추가하기
const addUser = async (payload: User_info) => {
  console.log(payload);

  const { data, error } = await supabase
    .from("user_info")
    .insert(payload)
    .select();

  console.log("addUser ", error);
  console.log("addUser ", data);
};

export { signUp, getUserInfo, getUsersInfo, addUser };
