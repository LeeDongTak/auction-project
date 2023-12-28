import { UserOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Avatar } from "antd";
import { useState } from "react";
import { styled } from "styled-components";
import { getUserInfo } from "../../../api/auth";
import { QUERY_KEYS } from "../../../query/keys.constant";
import { StListWrapper } from "../../MyPagePosts/MyPagePosts.styles";

const EditProfile = ({ title }: { title: string }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const { user: userData } = JSON.parse(
    localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token") as string
  );

  const userId = userData.id;

  const socialLoginUser = userData.user_metadata;

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
    // TODO: clear
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

  return (
    <StListWrapper>
      <h2>{title}</h2>
      <div>
        {socialLoginUser ? (
          <>
            <StTopSection>
              {socialLoginUser.avatar_url ? (
                <StImgBox>
                  <img src={socialLoginUser.avatar_url} alt="user-image" />
                </StImgBox>
              ) : (
                <Avatar shape="circle" size={64} icon={<UserOutlined />} />
              )}
              <p>{socialLoginUser.user_name}</p>
            </StTopSection>
            <section>
              <p>{socialLoginUser.address1 || "현재 주소가 없습니다."}</p>
              <p>{socialLoginUser.address2 || "현재 상세주소가 없습니다."}</p>
            </section>
          </>
        ) : (
          <>
            {user?.map((item) => (
              <>
                <StTopSection>
                  {item.profile_image ? (
                    <StImgBox>
                      <img src="" alt="user-image" />
                    </StImgBox>
                  ) : (
                    <Avatar shape="circle" size={64} icon={<UserOutlined />} />
                  )}
                  <p>{item.nickname}</p>
                </StTopSection>
                <section>
                  <p>{item.address1}</p>
                  <p>{item.address2}</p>
                </section>
              </>
            ))}
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
