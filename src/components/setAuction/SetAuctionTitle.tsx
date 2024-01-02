import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { setAuctionTitle } from "../../redux/modules/setAuctionSlice";

function SetAuctionTitle() {
  const dispatch = useAppDispatch();
  const { auctionTitle } = useAppSelector((state) => state.setAuction)

  const titleOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionTitle(e.target.value))
  }
  return (
    <StTitleWrapper>
      <StAuctionTitleTitle>경매품 이름</StAuctionTitleTitle>
      <StActionTitleInput type="text" value={auctionTitle} placeholder="경매품을 입력해 주세요" onChange={(e) => { titleOnChangeHandler(e) }} />
    </StTitleWrapper>
  )
}

export default SetAuctionTitle

const StTitleWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`

const StAuctionTitleTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
`

const StActionTitleInput = styled.input`
  width: 100%;
  font-size: 2.2em;
  padding: 0.8em;
  border: 0;
  box-shadow: 0 0 0.2em 0.1em #AFCAFF;
  border-radius: 0.5em;
  transition: 0.2s;
  &:focus{
    outline: none;
  box-shadow: 0 0 0.4em 0.1em #8da8dd;
  }
`