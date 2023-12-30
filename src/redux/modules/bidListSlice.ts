import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Bids } from "../../types/databaseRetrunTypes";
import { RootStateType } from "../config/configStore";

type BidListSlice = {
  bidList: Bids[];
};

const initialState: BidListSlice = {
  bidList: [],
};

const bidListSlice = createSlice({
  name: "bidList",
  initialState,
  reducers: {
    setBidList: (state, action: PayloadAction<Bids[]>) => {
      state.bidList = action.payload;
    },
    addBid: (state, action: PayloadAction<Bids>) => {
      state.bidList.push(action.payload);
    },
  },
});

export const { setBidList, addBid } = bidListSlice.actions;
export const selectorBidList = (state: RootStateType) => state.bidList;
export default bidListSlice.reducer;
