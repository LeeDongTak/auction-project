import moment from "moment";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { setAuctionEndDate, setAuctionEndTime, setAuctionStartDate, setAuctionStartTime } from "../../redux/modules/setAuctionSlice";
import PriceAndDateAlert from "./PriceAndDateAlert";

function SetAuctionDate({ auction_status }: { auction_status?: string }) {
  const { auctionId } = useParams();
  const { startDate, endDate, startTime, endTime } = useAppSelector((state) => state.setAuction)
  const dispatch = useAppDispatch();
  const startDateRef = useRef<HTMLInputElement>(null)
  const [date, setdate] = useState()
  const today = moment().format("YYYY-MM-DD")
  const nextDay = moment(startDate).add(1, 'days').format("YYYY-MM-DD")
  const lastDay = moment(startDate).add(7, 'days').format("YYYY-MM-DD")

  const startDateOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionStartDate(e.target.value));
  }

  const endDateOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionEndDate(e.target.value))
  }

  const startTimeOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionStartTime(e.target.value));
  }

  const endTimeOnChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionEndTime(e.target.value))
  }
  console.log(auction_status)
  return (
    <StDateWrapper>
      <StDateLimitBox>
        {auction_status === "1" && auctionId && <PriceAndDateAlert alertType="date" />}

        <StAuctionDateTitle>경매 시작 시간</StAuctionDateTitle>
        <StInputBox>
          <StActionDateInput type="date" value={startDate} min={today} ref={startDateRef} onChange={(e) => { startDateOnChangeHandler(e) }} required />
          <StActionDateInput type="time" value={startTime} onChange={(e) => { startTimeOnChangeHandler(e) }} />
        </StInputBox>
      </StDateLimitBox>
      <StSpaceText>~</StSpaceText>
      <StDateLimitBox2>
        <StAuctionDateTitle>경매 종료 시간</StAuctionDateTitle>
        <StInputBox>
          <StActionDateInput type="date" value={endDate} min={nextDay} max={lastDay} onChange={(e) => { endDateOnChangeHandler(e) }} required />
          <StActionDateInput type="time" value={endTime} onChange={(e) => { endTimeOnChangeHandler(e) }} />
        </StInputBox>
      </StDateLimitBox2>

    </StDateWrapper>
  )
}

export default SetAuctionDate



const StDateWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const StAuctionDateTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`

const StDateLimitBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 5em;
`
const StDateLimitBox2 = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  padding-bottom: 5em;
`

const StInputBox = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`

const StActionDateInput = styled.input`
  width: 40%;
  font-size: 2.2em;
  padding: 0.5em;
  border: 0;
  box-shadow: 0 0 0.2em 0.1em #AFCAFF;
  border-radius: 0.5em;
  transition: 0.2s;
  &:focus{
    outline: none;
  box-shadow: 0 0 0.4em 0.1em #8da8dd;
  }
`


const StSpaceText = styled.div`
  width: 20%;
  height: auto;
  font-size: 5em;
  display: flex;
  justify-content: center;
  align-items: center;
`
