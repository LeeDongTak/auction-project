import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Auction_post } from "../../types/databaseRetrunTypes";
import { RootStateType } from "../config/configStore";

const initialState = {
  auctionData: {} as Auction_post,
};
const auctionSingleDataSlice = createSlice({
  name: "auctionSingleData",
  initialState,
  reducers: {
    setAuctionData: (state, action: PayloadAction<Auction_post>) => {
      console.log("action.payload = ", action.payload);
      state.auctionData = action.payload;
    },
    resetAuctionData: (state) => {
      console.log("resetAuctionData 실행!");
      state.auctionData = {} as Auction_post;
    },
  },
});

export const { setAuctionData, resetAuctionData } =
  auctionSingleDataSlice.actions;
export const selectorAuctionSingleData = (state: RootStateType) =>
  state.auctionSingleData;
export default auctionSingleDataSlice.reducer;
