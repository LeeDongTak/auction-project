import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import search from "../../images/search.svg";
function Header() {
  const navigate = useNavigate();
  const LogoClickHandler = () => {
    navigate("/");
  };
  return (
    <StHeader>
      <p onClick={LogoClickHandler}>엘리트옥션</p>
      <div>
        <img src={search} />
        <button>로그인</button>
      </div>
    </StHeader>
  );
}

export default Header;
const StHeader = styled.header`
  background-color: #afcaff;
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 15px 20px;
  align-items: center;
  margin-bottom: 20px;
  button {
    border: none;
    font-size: 1.5rem;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
    background-color: #afcaff;
    margin-left: 10px;
    &:hover {
      background-color: #fffacd;
    }
  }
  div {
    display: flex;
  }
  img {
    width: 30px;
    cursor: pointer;
  }
  p {
    cursor: pointer;
    user-select: none;
  }
`;
