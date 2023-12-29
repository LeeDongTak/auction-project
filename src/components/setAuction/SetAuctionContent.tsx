import { styled } from "styled-components";
import { useAppDispatch } from "../../redux/config/configStore";
import { setAuctionContent } from "../../redux/modules/setAuctionSlice";

function SetAuctionContent() {
  const dispatch = useAppDispatch();

  const contentOnChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(setAuctionContent(e.target.value))
  }

  return (
    <StContentWrapper>
      <StAuctionContentTitle>경매품 소개</StAuctionContentTitle>
      <StActionContentInput type="text" placeholder="내용을 입력해 주세요" cols="30" rows="10" onChange={(e) => { contentOnChangeHandler(e) }} >
      </StActionContentInput>

    </StContentWrapper>
  )
}

export default SetAuctionContent

const StContentWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`

const StAuctionContentTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
`

const StActionContentInput = styled.textarea<{ type: string, cols: string, rows: string }>`
  width: 97.1%;
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