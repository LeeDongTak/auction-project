import { UserOutlined } from "@ant-design/icons";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { Avatar } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../../api/auth";
import { QUERY_KEYS } from "../../../query/keys.constant";
import { useUserUpdateMutation } from "../../../query/useUsersQuery";
import { StListWrapper } from "../../MyPagePosts/MyPagePosts.styles";

const EditProfile = ({ title }: { title: string }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputNickname, setInputNickname] = useState("");
  const [inputAddress1, setInputAddress1] = useState("");
  const [inputAddress2, setInputAddress2] = useState("");
  const [image, setImage] = useState("");

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

  console.log(user);

  const submitHandler = () => {
    const answer = window.confirm("저장하시겠습니까?");

    if (!answer) return;
    // TODO: 수정 내용 반영
    const updateProfile = {
      user_id: user?.[0].user_id as string,
      nickname: inputNickname || user?.[0].nickname,
      address1: inputAddress1 || user?.[0].address1,
      address2: inputAddress2 || user?.[0].address2,
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

    // TODO: clear
    setIsEdit(false);
  };

  const handleChange = (e: React.ChangeEvent) => {
    const targetFiles = (e.target as HTMLInputElement).files as FileList;
    console.log(targetFiles[0]);
    const fileURL = URL.createObjectURL(targetFiles[0]); // blob (미리보기용)
    console.log(fileURL);
  };

  return (
    <StListWrapper>
      <h2>{title}</h2>
      <div>
        {isEdit ? (
          <>
            <StTopSection>
              {user?.[0].profile_image ? (
                <StImgBox>
                  <img src={user?.[0].profile_image} alt="user-image" />
                </StImgBox>
              ) : (
                <Avatar shape="circle" size={64} icon={<UserOutlined />} />
              )}
              <label htmlFor="file">프로필 사진 수정</label>
              <input type="file" id="file" onChange={handleChange} />
              <input
                type="text"
                placeholder="nickname"
                defaultValue={user?.[0].nickname}
                onChange={(e) => setInputNickname(e.target.value)}
              />
            </StTopSection>
            <section>
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
            </section>
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
            <section>
              <p>{user?.[0].address1 || "현재 주소가 없습니다."}</p>
              <p>{user?.[0].address2 || "현재 상세주소가 없습니다."}</p>
            </section>
          </>
        )}

        <ButtonSection>
          {isEdit ? (
            <>
              <button onClick={cancelHandler}>취소</button>
              <button onClick={submitHandler}>완료</button>
            </>
          ) : (
            <button onClick={() => setIsEdit(true)}>프로필 수정</button>
          )}
        </ButtonSection>
      </div>
    </StListWrapper>
  );
};

const StTopSection = styled.section`
  display: flex;
  align-items: flex-end;
  gap: 2rem;
  margin-bottom: 2rem;

  p {
    font-size: small;
  }
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: inherit;
    height: inherit;
  }
`;

const ButtonSection = styled.section`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

export default EditProfile;
