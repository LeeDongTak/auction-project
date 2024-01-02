import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { setAuctionLowerPrice } from "../../redux/modules/setAuctionSlice";
import PriceAndDateAlert from "./PriceAndDateAlert";

function SetAuctionPrice({ auction_status }: { auction_status?: string }) {
  const { auctionId } = useParams();
  const dispatch = useAppDispatch();
  const { auctionUpperPrice, auctionLowerPrice } = useAppSelector((state) => state.setAuction)

  const lowerPriceOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (+e.target.value < 0) {
      dispatch(setAuctionLowerPrice(0))
    } else {
      dispatch(setAuctionLowerPrice(+e.target.value))
    }
  }
  // const upperPriceOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   dispatch(setAuctionUpperPrice(+e.target.value))
  // }
  return (
    <StPriceWrapper>
      {auction_status === "1" && auctionId && <PriceAndDateAlert alertType="price" />}
      <StPriceLimitBox>
        <StAuctionPriceTitle>최소입찰가격</StAuctionPriceTitle>
        <StActionPriceInput type="number" value={auctionLowerPrice} placeholder="최소금액을 입력해 주세요" onChange={(e) => { lowerPriceOnChangeHandler(e) }} />
      </StPriceLimitBox>
      <StPriceLimitBox>
        {/* <StAuctionPriceTitle>최대금액</StAuctionPriceTitle>
        <StActionPriceInput type="number" value={auctionUpperPrice} placeholder="최대금액을 입력해 주세요" onChange={(e) => { upperPriceOnChangeHandler(e) }} /> */}
      </StPriceLimitBox>
    </StPriceWrapper>
  )
}

export default SetAuctionPrice


const StPriceWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  padding-bottom: 5em;
  /* display: flex;
  justify-content: space-between; */
`

const StPriceLimitBox = styled.div`
  /* width: 40%; */
  width: 100%;
  height: auto;
`

const StAuctionPriceTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`

const StActionPriceInput = styled.input`
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