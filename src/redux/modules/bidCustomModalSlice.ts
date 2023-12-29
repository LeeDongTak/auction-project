import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";
import { MaxBids } from "../../types/databaseRetrunTypes";

type BidCustomModalActionPayload = {
  maxBid: MaxBids | undefined;
  minBid?: number;
  auction_id: string | undefined;
};
const initialState = {
  isOpen: false,
  result: false,
  maxBid: {} as MaxBids | undefined,
  minBid: 0,
  auction_id: "" as string | undefined,
};

const bidCustomModalSlice = createSlice({
  name: "bidCustomModal",
  initialState,
  reducers: {
    openBidCustomModal: (
      state,
      action: PayloadAction<BidCustomModalActionPayload>
    ) => {
      state.isOpen = true;
      state.maxBid = action.payload.maxBid;
      state.minBid = action.payload.minBid || 0;
      state.auction_id = action.payload.auction_id;
    },
    closeBidCustomModal: (state) => {
      state.isOpen = false;
      state.maxBid = {} as MaxBids | undefined;
    },
    resetBidCustomModal: (state) => {
      console.log("reset modal!");
      state.isOpen = false;
      state.maxBid = {} as MaxBids | undefined;
      state.minBid = 0;
      state.auction_id = "" as string | undefined;
    },
  },
});

export const { openBidCustomModal, closeBidCustomModal, resetBidCustomModal } =
  bidCustomModalSlice.actions;

export const selectorBidCustomModal = (state: RootStateType) =>
  state.bidCustomModal;

export default bidCustomModalSlice.reducer;
