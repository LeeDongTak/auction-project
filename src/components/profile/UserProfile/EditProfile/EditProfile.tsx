import { UserOutlined } from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Avatar } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../../../api/auth";
import { useCustomModal } from "../../../../hooks/useCustomModal";
import { QUERY_KEYS } from "../../../../query/keys.constant";
import { useUserUpdateMutation } from "../../../../query/useUsersQuery";
import { supabase } from "../../../../supabase";
import { User_info } from "../../../../types/databaseRetrunTypes";
import ProfileAvatar from "../../../common/Avatar";
import Button from "../../../common/Button";

interface EditProfileProps {
  user: User_info;
  title: string;
  userId: string;
}

const EditProfile = ({ user, title, userId }: EditProfileProps) => {
  const { handleOpenCustomModal } = useCustomModal();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState("");
  const [inputAddress1, setInputAddress1] = useState("");
  const [inputAddress2, setInputAddress2] = useState("");
  const [fileImage, setFileImage] = useState<File>();

  const queryClient = new QueryClient();

  const { mutate: updateMutate, data: updateData } = useUserUpdateMutation();

  const { data, refetch } = useQuery({
    queryKey: [QUERY_KEYS.USER, userId],
    queryFn: () => getUserInfo(userId),
  });

  const handleRefetch = async () => {
    await refetch();
  };

  console.log("updateData", updateData);

  // 수정사항 저장
  const submitHandler = async () => {
    // if (!inputNickname && !inputAddress1 && !inputAddress2) {
    //   alert("정보가 변경되지 않았습니다.");
    //   return;
    // }

    if (!(await handleOpenCustomModal("저장하시겠습니까?", "confirm"))) return;

    const profileURL = await getFileUrl(fileImage as File);

    const updateProfile = {
      user_id: user?.user_id as string,
      nickname: inputNickname || user?.nickname,
      address1: inputAddress1 || user?.address1,
      address2: inputAddress2 || user?.address2,
      profile_image: fileImage ? (profileURL as string) : user?.profile_image,
    };

    updateMutate(updateProfile, {
      onSuccess: (data) => {
        console.log("onSuccess", data);

        queryClient.invalidateQueries({
          queryKey: [QUERY_KEYS.USER, userId],
        });

        handleRefetch();
      },
    });

    setIsEdit(false);
  };

  const cancelHandler = async () => {
    if (!(await handleOpenCustomModal("취소되었습니다.", "alert"))) return;

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
    }
  };

  // storage에 저장된 파일 URL 가져오기
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
                {user?.profile_image ? (
                  <ProfileAvatar
                    src={
                      fileImage
                        ? URL.createObjectURL(fileImage)
                        : user?.profile_image
                    }
                    alt="user-image"
                    size="7rem"
                  />
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
                defaultValue={user?.nickname}
                onChange={(e) => setInputNickname(e.target.value)}
              />
            </StTopSection>
            <p>{fileImage?.name}</p>

            <StInfoSection>
              <div>
                <span>주소</span>
                <span>상세 주소</span>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="주소1"
                  defaultValue={user?.address1}
                  onChange={(e) => setInputAddress1(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="주소2"
                  defaultValue={user?.address2}
                  onChange={(e) => setInputAddress2(e.target.value)}
                />
              </div>
            </StInfoSection>
          </>
        ) : (
          <>
            <StTopSection>
              {user?.profile_image ? (
                <ProfileAvatar
                  src={user?.profile_image}
                  alt="user-image"
                  size="7rem"
                />
              ) : (
                <Avatar shape="circle" size={64} icon={<UserOutlined />} />
              )}
              <p>{user?.nickname || "new user"}</p>
            </StTopSection>
            <StInfoSection>
              <div>
                <span>주소</span>
                <span>상세 주소</span>
              </div>
              <div>
                <p>{user?.address1 || "현재 주소가 없습니다."}</p>
                <p>{user?.address2 || "현재 상세주소가 없습니다."}</p>
              </div>
            </StInfoSection>
          </>
        )}

        <ButtonSection>
          {isEdit ? (
            <div>
              <Button text="취소" onClickHandler={cancelHandler} />
              <Button text="완료" onClickHandler={submitHandler} />
            </div>
          ) : (
            <Button
              text="프로필 수정"
              mode="dark"
              onClickHandler={() => setIsEdit(true)}
            />
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
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 7px #d9d9d9;
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
      background-color: var(--main-color);
      width: 7rem;
      text-align: center;
      padding: 1rem;
      border-radius: 0.5rem;
      color: #fff;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: #666;
      }
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
  margin-top: 1.5rem;
  padding-left: 1rem;

  span,
  p {
    font-size: medium;
  }

  > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    input {
      font-size: small;
    }
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 5rem;

  > div {
    display: flex;
    gap: 1rem;
  }
`;

const StInputLabel = styled.label`
  background-color: var(--main-color);
`;

const StInputFile = styled.input`
  display: none;
`;

export default EditProfile;
