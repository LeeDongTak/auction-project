import { supabase } from "../supabase";
import { User_info } from "../types/databaseRetrunTypes";

interface updateProps {
  user_id: string;
  nickname?: string;
  address1?: string;
  address2?: string;
  profile_image?: string;
}

// 모든 유저 데이터 불러오기
const getUsersInfo = async () => {
  const { data, error } = await supabase
    .from("user_info")
    .select("*")
    .returns<User_info[]>();

  if (error) {
    console.log("유저 정보 불러오기 실패", error);
  }

  return data;
};

// 현재 로그인한 유저 데이터 불러오기
const getUserInfo = async (id: string): Promise<User_info[]> => {
  const { data: user_info, error } = await supabase
    .from("user_info")
    .select("*")
    .eq("user_id", id);

  if (error) {
    console.log("현재 유저 데이터 불러오기 실패", error);
  }

  return user_info as User_info[];
};

// 유저 데이터 추가하기
const addUser = async (payload: User_info) => {
  const { data, error } = await supabase
    .from("user_info")
    .insert(payload)
    .select();

  if (error) {
    console.error("사용자 등록 중 오류 발생!", error.message);
  }
};

// 소셜 로그인 유저 추가
const addSocialUser = async (payload: User_info): Promise<void> => {
  const { data, error } = await supabase.from("user_info").insert(payload);

  if (error && error.code !== "23505") {
    console.error("사용자 등록 중 오류 발생!", error.message);
  }
};

// 유저 정보 업데이트
const updateUser = async ({
  user_id,
  nickname,
  address1,
  address2,
  profile_image,
}: updateProps) => {
  const { data, error } = await supabase
    .from("user_info")
    .update({ nickname, address1, address2, profile_image })
    .eq("user_id", user_id)
    .select();

  if (error) {
    console.log("유저 업데이트 에러", error);
  }
};

export { getUserInfo, getUsersInfo, addUser, addSocialUser, updateUser };
