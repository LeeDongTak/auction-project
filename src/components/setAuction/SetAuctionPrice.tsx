import { styled } from "styled-components";
import { useAppDispatch } from "../../redux/config/configStore";
import { setAuctionLowerPrice, setAuctionUpperPrice } from "../../redux/modules/setAuctionSlice";

function SetAuctionPrice() {
  const dispatch = useAppDispatch();

  const lowerPriceOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionLowerPrice(+e.target.value))
  }
  const upperPriceOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionUpperPrice(+e.target.value))
  }
  return (
    <StPriceWrapper>
      <StPriceLimitBox>
        <StAuctionPriceTitle>최소금액</StAuctionPriceTitle>
        <StActionPriceInput type="number" placeholder="최소금액을 입력해 주세요" onChange={(e) => { lowerPriceOnChangeHandler(e) }} />
      </StPriceLimitBox>
      <StPriceLimitBox>
        <StAuctionPriceTitle>최대금액</StAuctionPriceTitle>
        <StActionPriceInput type="number" placeholder="최대금액을 입력해 주세요" onChange={(e) => { upperPriceOnChangeHandler(e) }} />
      </StPriceLimitBox>
    </StPriceWrapper>
  )
}

export default SetAuctionPrice


const StPriceWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
  display: flex;
  justify-content: space-between;
`

const StPriceLimitBox = styled.div`
  width: 40%;
  height: auto;
`

const StAuctionPriceTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`

const StActionPriceInput = styled.input`
  width: 92.9%;
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