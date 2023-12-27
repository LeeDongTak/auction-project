import { styled } from "styled-components";

const UserProfile = () => {
  return (
    <StProfileContainer>
      <StImgBox>
        <img src="" alt="img" />
      </StImgBox>
      <p>nickname</p>
    </StProfileContainer>
  );
};

const StProfileContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
  padding: 2rem;
  font-size: 2rem;
  border: 1px solid #222;
  margin-bottom: 2rem;
  background-color: #eee;
`;

const StImgBox = styled.div`
  background-color: gray;
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
`;

export default UserProfile;
