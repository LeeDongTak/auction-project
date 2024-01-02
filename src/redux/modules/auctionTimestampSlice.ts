import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";
import { AuctionStatus, TimeUntil } from "../../types/detailTyps";

const initialState: TimeUntil = {
  auctionTimeStamp: "",
  auctionOver: AuctionStatus.READY,
};

const auctionTimestampSlice = createSlice({
  name: "auctionTimestamp",
  initialState,
  reducers: {
    setAuctionTimeStamp: (state, action: PayloadAction<TimeUntil>) => {
      const { auctionTimeStamp, auctionOver } = action.payload;
      state.auctionTimeStamp = auctionTimeStamp;
      state.auctionOver = auctionOver;
    },
  },
});

export const { setAuctionTimeStamp } = auctionTimestampSlice.actions;
export const selectorAuctionTimeStamp = (state: RootStateType) =>
  state.auctionTimestamp;
export default auctionTimestampSlice.reducer;
