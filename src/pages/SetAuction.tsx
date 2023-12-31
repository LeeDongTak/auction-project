import { useEffect } from "react"
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import SetAuctionAlert from "../components/setAuction/SetAuctionAlert"
import SetAuctionButton from "../components/setAuction/SetAuctionBtn"
import SetAuctionCategory from "../components/setAuction/SetAuctionCategory"
import SetAuctionContent from "../components/setAuction/SetAuctionContent"
import SetAuctionDate from "../components/setAuction/SetAuctionDate"
import SetAuctionImage from "../components/setAuction/SetAuctionImage"
import SetAuctionPrice from "../components/setAuction/SetAuctionPrice"
import SetAuctionProductStatus from "../components/setAuction/SetAuctionProductStatus"
import SetAuctionShippingType from "../components/setAuction/SetAuctionShippingType"
import SetAuctionTitle from "../components/setAuction/SetAuctionTitle"
import { useAppDispatch, useAppSelector } from "../redux/config/configStore"
import { setIsAlert } from "../redux/modules/setAuctionSlice"


function SetAuction() {
  const { auctionId } = useParams();
  const { isAlert, alertMsg } = useAppSelector((state) => state.setAuction)
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (isAlert) {
      if (alertMsg !== "로딩중...") {
        setTimeout(() => {
          dispatch(setIsAlert({ isAlert: false, ErrorMsg: "" }))
        }, 3000)
      }
    }
  }, [isAlert])

  return (<>
    <StWrapper>
      {isAlert && <SetAuctionAlert />}
      <StTitle>{!auctionId ? "경매품 등록" : "경매품 수정"}</StTitle>
      <SetAuctionImage />
      <SetAuctionTitle />
      <SetAuctionContent />
      <SetAuctionPrice />
      <SetAuctionDate />
      <SetAuctionShippingType />
      <SetAuctionProductStatus />
      <SetAuctionCategory />
      <SetAuctionButton />
    </StWrapper>
  </>
  )
}

export default SetAuction


const StWrapper = styled.div`
  width: 1200px;
  background-color: #fff;
  height: auto;
  margin: 0 auto;
  font-size: 12px;
`

const StTitle = styled.div`
  width: 100%;
  text-align: center;
  font-size: 4em;
  padding: 1.5em 0;
`