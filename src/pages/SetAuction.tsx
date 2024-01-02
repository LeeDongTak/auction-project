import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import { fetchAuctionMaxBid, fetchGetAuctionById } from "../api/setAuction"
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
import { useCustomQuery } from "../hooks/useCustomQuery"
import { useAppDispatch, useAppSelector } from "../redux/config/configStore"
import { resetState, setAuctionCategoryList, setAuctionContent, setAuctionEndDate, setAuctionEndTime, setAuctionLowerPrice, setAuctionProductStatus, setAuctionShippingType, setAuctionStartDate, setAuctionStartTime, setAuctionTitle, setImageUrlList, setIsAlert } from "../redux/modules/setAuctionSlice"
import { Auction_post, Bids } from "../types/databaseRetrunTypes"

function SetAuction() {
  const { auctionId } = useParams();
  console.log(auctionId)
  const { isAlert, alertMsg } = useAppSelector((state) => state.setAuction)
  const dispatch = useAppDispatch()
  const [updIsLoading, setUpdIsLoading] = useState(false)

  const queryOptionsAuctionPost: any = auctionId ? {
    queryKey: ["getAuctionDataInUpdate"],
    queryFn: () => fetchGetAuctionById(auctionId),
    queryOptions: { staleTime: Infinity, enabled: !!auctionId },
  } :
    {
      queryKey: ["getAuctionDataInUpdate"],
      queryFn: () => fetchGetAuctionById("8f84be4e-d98c-4fea-a175-bb9a17cc627e"),
      queryOptions: { staleTime: Infinity, enabled: !!auctionId },
    }
  const queryOptionsBids: any = auctionId ? {
    queryKey: ["getAuctionDataInUpdate"],
    queryFn: () => fetchAuctionMaxBid(auctionId),
    queryOptions: { staleTime: Infinity, enabled: !!auctionId },
  } :
    {
      queryKey: ["getAuctionDataInUpdate"],
      queryFn: () => fetchGetAuctionById("8f84be4e-d98c-4fea-a175-bb9a17cc627e"),
      queryOptions: { staleTime: Infinity, enabled: !!auctionId },
    }
  const [auctionPostData, auctionPostIsLoading] = useCustomQuery<Auction_post>(queryOptionsAuctionPost);
  const [bidsData, bidsIsLoading] = useCustomQuery<Bids>(queryOptionsBids);
  useEffect(() => {
    if (auctionId) {
      setUpdIsLoading(auctionPostIsLoading)
      const startDateState = dayjs(auctionPostData?.auction_start_date).format("YYYY-MM-DD");
      const endDateState = dayjs(auctionPostData?.auction_end_date).format("YYYY-MM-DD");
      const startTimeState = dayjs(auctionPostData?.auction_start_date).format("HH:mm");
      const endTimeState = dayjs(auctionPostData?.auction_end_date).format("HH:mm");
      if (!auctionPostIsLoading || auctionPostData) {
        if (auctionPostData?.auction_images) {
          auctionPostData?.auction_images.forEach((imgPath) => {
            let img: string | undefined = imgPath?.image_path
            dispatch(setImageUrlList(img))
          })
          dispatch(setAuctionTitle(auctionPostData?.title))
          dispatch(setAuctionContent(auctionPostData?.content))
          dispatch(setAuctionLowerPrice(auctionPostData?.lower_limit))
          dispatch(setAuctionShippingType(auctionPostData?.shipping_type))
          dispatch(setAuctionProductStatus(auctionPostData?.product_status))
          dispatch(setAuctionEndDate(endDateState))
          dispatch(setAuctionStartDate(startDateState))
          dispatch(setAuctionStartTime(startTimeState))
          dispatch(setAuctionEndTime(endTimeState))
          dispatch(setAuctionCategoryList(auctionPostData?.category_id))
        }
      }
    }
  }, [auctionPostIsLoading])

  useEffect(() => {
    if (isAlert) {
      if (alertMsg !== "로딩중...") {
        setTimeout(() => {
          dispatch(setIsAlert({ isAlert: false, ErrorMsg: "" }))
        }, 3000)
      }
    }
  }, [isAlert])
  if (auctionId) {
  }
  useEffect(() => {
    dispatch(resetState())
  }, [])
  return (<>
    <StWrapper>
      {isAlert && <SetAuctionAlert />}
      <StTitle>{!auctionId ? "경매품 등록" : "경매품 수정"}</StTitle>
      <SetAuctionImage />
      <SetAuctionTitle />
      <SetAuctionContent />
      <SetAuctionPrice auction_status={auctionPostData?.auction_status} />
      <SetAuctionDate auction_status={auctionPostData?.auction_status} />
      <SetAuctionShippingType />
      <SetAuctionProductStatus />
      <SetAuctionCategory UpdIsLoading={updIsLoading} />
      <SetAuctionButton bidsData={bidsData} data={auctionPostData} />
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