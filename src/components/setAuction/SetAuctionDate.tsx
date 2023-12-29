import moment from "moment";
import { useRef, useState } from "react";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import { setAuctionEndDate, setAuctionEndTime, setAuctionStartDate, setAuctionStartTime } from "../../redux/modules/setAuctionSlice";

function SetAuctionDate() {
  const { startDate, endDate, startTime, endTime } = useAppSelector((state) => state.setAuction)
  const dispatch = useAppDispatch();
  const startDateRef = useRef<HTMLInputElement>(null)
  const [date, setdate] = useState()
  const today = moment().format("YYYY-MM-DD")
  const nextDay = moment(startDate).add(1, 'days').format("YYYY-MM-DD")

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


  return (
    <StDateWrapper>
      <StAuctionDateTitle>경매 기간</StAuctionDateTitle>
      <StDateLimitBox>
        <StInputBox>
          <StActionDateInput type="date" value={startDate} min={today} ref={startDateRef} onChange={(e) => { startDateOnChangeHandler(e) }} required />
          <StActionDateInput type="time" value={startTime} onChange={(e) => { startTimeOnChangeHandler(e) }} />
        </StInputBox>
        <StSpaceText>~</StSpaceText>
        <StInputBox>
          <StActionDateInput type="date" value={endDate} min={nextDay} max={endDate} onChange={(e) => { endDateOnChangeHandler(e) }} required />
          <StActionDateInput type="time" value={endTime} onChange={(e) => { endTimeOnChangeHandler(e) }} />
        </StInputBox>
      </StDateLimitBox>

    </StDateWrapper>
  )
}

export default SetAuctionDate



const StDateWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`

const StAuctionDateTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`

const StDateLimitBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
`

const StInputBox = styled.div`
  width: 40%;
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
  width: auto;
  height: auto;
  font-size: 5em;
`
