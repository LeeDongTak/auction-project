import { UserOutlined } from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Avatar, Button } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../../api/auth";
import { QUERY_KEYS } from "../../../query/keys.constant";
import { useUserUpdateMutation } from "../../../query/useUsersQuery";
import { supabase } from "../../../supabase";

const EditProfile = ({ title }: { title: string }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState("");
  const [inputAddress1, setInputAddress1] = useState("");
  const [inputAddress2, setInputAddress2] = useState("");
  const [fileImage, setFileImage] = useState<File>();

  const queryClient = new QueryClient();

  const { mutate: updateMutate } = useUserUpdateMutation();

  const { user: userData } = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );
  const userId = userData.id;

  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.USER],
    queryFn: () => getUserInfo(userId),
    enabled: !!userId,
  });

  // 수정사항 저장
  const submitHandler = async () => {
    const answer = window.confirm("저장하시겠습니까?");

    if (!answer) return;

    const profileURL = await getFileUrl(fileImage as File);

    const updateProfile = {
      user_id: user?.[0].user_id as string,
      nickname: inputNickname || user?.[0].nickname,
      address1: inputAddress1 || user?.[0].address1,
      address2: inputAddress2 || user?.[0].address2,
      profile_image: fileImage
        ? (profileURL as string)
        : user?.[0].profile_image,
    };

    updateMutate(updateProfile, {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER] });
      },
    });

    setIsEdit(false);
  };

  const cancelHandler = () => {
    const answer = window.confirm(
      "취소하시겠습니까? 수정 내용은 저장돠지 않습니다."
    );

    if (!answer) return;

    setFileImage(undefined);
    setIsEdit(false);
  };

  // 프로필 수정 파일 업로드
  const uploadFile = async (fileImage: File) => {
    const { data, error } = await supabase.storage
      .from("user_image")
      .upload(`profile/${fileImage?.name}`, fileImage);

    if (error) {
      console.log("이미지 업로드 에러", error.message);
    } else {
      console.log(data);
    }
  };

  // storagy에 저장된 파일 URL 가져오기
  async function getFileUrl(fileImage: File) {
    uploadFile(fileImage);

    try {
      // Storage에서 파일 정보 가져오기
      const { data } = await supabase.storage
        .from("user_image")
        .getPublicUrl(`profile/${fileImage?.name}`);

      console.log(data.publicUrl);
      // 파일의 Public URL 반환
      return data.publicUrl;
    } catch (error) {
      console.error("Error getting file URL:", error);
      return null;
    }
  }

  return (
    <>
      <h2>{title}</h2>
      <StProfileWrapper>
        {isEdit ? (
          <>
            <StTopSection>
              <div>
                {user?.[0].profile_image ? (
                  <StImgBox>
                    <img
                      src={
                        fileImage
                          ? URL.createObjectURL(fileImage)
                          : user?.[0].profile_image
                      }
                      alt="user-image"
                    />
                  </StImgBox>
                ) : (
                  <Avatar shape="circle" size={64} icon={<UserOutlined />} />
                )}
                <label htmlFor="file">이미지 선택</label>
                <StInputFile
                  type="file"
                  id="file"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e) => setFileImage(e.target.files?.[0])}
                />
              </div>
              <input
                type="text"
                placeholder="nickname"
                defaultValue={user?.[0].nickname}
                onChange={(e) => setInputNickname(e.target.value)}
              />
            </StTopSection>
            {/* <p>{fileImage?.name}</p> */}

            <StInfoSection>
              <div>
                <span>주소</span>
                <span>상세 주소</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="주소1"
                  defaultValue={user?.[0].address1}
                  onChange={(e) => setInputAddress1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="주소2"
                  defaultValue={user?.[0].address2}
                  onChange={(e) => setInputAddress2(e.target.value)}
                />
              </div>
            </StInfoSection>
          </>
        ) : (
          <>
            <StTopSection>
              {user?.[0].profile_image ? (
                <StImgBox>
                  <img src={user?.[0].profile_image} alt="user-image" />
                </StImgBox>
              ) : (
                <Avatar shape="circle" size={64} icon={<UserOutlined />} />
              )}
              <p>{user?.[0].nickname || "new user"}</p>
            </StTopSection>
            <StInfoSection>
              <div>
                <span>주소</span>
                <span>상세 주소</span>
              </div>
              <div>
                <p>{user?.[0].address1 || "현재 주소가 없습니다."}</p>
                <p>{user?.[0].address2 || "현재 상세주소가 없습니다."}</p>
              </div>
            </StInfoSection>
          </>
        )}

        <ButtonSection>
          {isEdit ? (
            <div>
              <Button onClick={cancelHandler}>취소</Button>
              <Button type="primary" onClick={submitHandler}>
                완료
              </Button>
            </div>
          ) : (
            <Button type="primary" onClick={() => setIsEdit(true)}>
              프로필 수정
            </Button>
          )}
        </ButtonSection>
      </StProfileWrapper>
    </>
  );
};

const StProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const StTopSection = styled.section`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  width: 100%;

  p {
    font-size: medium;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      background-color: gray;
      width: 7rem;
      text-align: center;
      padding: 1rem;
      border-radius: 0.5rem;
      color: #fff;
    }
  }

  input {
    margin-bottom: 4rem;
  }
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }
`;

const StInfoSection = styled.section`
  display: flex;
  align-items: center;
  gap: 2rem;

  > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    input {
      font-size: 0.8rem;
    }
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;

  > div {
    display: flex;
    gap: 1rem;
  }
`;

const StInputFile = styled.input`
  display: none;
`;

export default EditProfile;
