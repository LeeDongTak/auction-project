import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { styled } from "styled-components"
import { fetchGetAuctionById } from "../api/auction"
import connectSupabase from "../api/connectSupabase"
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
import { setAuctionCategoryList, setAuctionContent, setAuctionEndDate, setAuctionEndTime, setAuctionLowerPrice, setAuctionProductStatus, setAuctionShippingType, setAuctionStartDate, setAuctionStartTime, setAuctionTitle, setAuctionUpperPrice, setImageUrlList, setIsAlert } from "../redux/modules/setAuctionSlice"
import { Auction_post } from "../types/databaseRetrunTypes"

function SetAuction() {
  const { auctionId } = useParams();
  const { isAlert, alertMsg } = useAppSelector((state) => state.setAuction)
  const dispatch = useAppDispatch()
  const [updIsLoading, setUpdIsLoading] = useState(false)

  if (auctionId) {
    const queryOptions = {
      queryKey: ["getAuctionDataInUpdate"],
      queryFn: () => fetchGetAuctionById(auctionId),
      queryOptions: { staleTime: Infinity },
    };
    const [data, isLoading] = useCustomQuery<Auction_post>(queryOptions);
    useEffect(() => {
      if (auctionId) {
        setUpdIsLoading(isLoading)
        const startDateState = dayjs(data?.auction_start_date).format("YYYY-MM-DD");
        const endDateState = dayjs(data?.auction_end_date).format("YYYY-MM-DD");
        const startTimeState = dayjs(data?.auction_start_date).format("HH:mm");
        const endTimeState = dayjs(data?.auction_end_date).format("HH:mm");
        if (!isLoading || data) {
          if (data?.auction_images) {
            data?.auction_images.forEach((imgPath) => {
              let img: string | undefined = imgPath?.image_path
              dispatch(setImageUrlList(img))
            })
            dispatch(setAuctionTitle(data?.title))
            dispatch(setAuctionContent(data?.content))
            dispatch(setAuctionLowerPrice(data?.lower_limit))
            dispatch(setAuctionUpperPrice(data?.upper_limit))
            dispatch(setAuctionShippingType(data?.shipping_type))
            dispatch(setAuctionProductStatus(data?.product_status))
            dispatch(setAuctionStartDate(startDateState))
            dispatch(setAuctionEndDate(endDateState))
            dispatch(setAuctionStartTime(startTimeState))
            dispatch(setAuctionEndTime(endTimeState))
            dispatch(setAuctionCategoryList(data?.category_id))
          }
        }
      }
    }, [isLoading])


  }
  useEffect(() => {
    if (isAlert) {
      if (alertMsg !== "로딩중...") {
        setTimeout(() => {
          dispatch(setIsAlert({ isAlert: false, ErrorMsg: "" }))
        }, 3000)
      }
    }
  }, [isAlert])
  const testGetData = async () => {

    let { data: auction_post, error } = await connectSupabase
      .from('auction_post')
      .select('*')
      .in('auction_id', ['ff86bd7b-1b53-4bca-a666-0eeadce7df0b'])

    console.log(auction_post)
    console.log(error)
  }

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
      <SetAuctionCategory UpdIsLoading={updIsLoading} />
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