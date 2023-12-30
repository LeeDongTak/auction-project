import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";
import { MaxBids } from "../../types/databaseRetrunTypes";

type BidCustomModalActionPayload = {
  maxBid?: MaxBids | undefined;
  lowerPrice?: number;
  auction_id: string | undefined;
};
const initialState = {
  isOpen: false,
  result: false,
  maxBid: {} as MaxBids | undefined,
  lowerPrice: 0,
  auction_id: "" as string | undefined,
};

const bidCustomModalSlice = createSlice({
  name: "bidCustomModal",
  initialState,
  reducers: {
    openBidCustomModal: (state) => {
      state.isOpen = true;
    },
    closeBidCustomModal: (state) => {
      state.isOpen = false;
    },
    setBidData: (state, action: PayloadAction<BidCustomModalActionPayload>) => {
      state.maxBid = action.payload.maxBid;
      state.lowerPrice = action.payload.lowerPrice || 0;
      state.auction_id = action.payload.auction_id;
    },
    resetBidCustomModal: (state) => {
      state.isOpen = false;
      state.maxBid = {} as MaxBids | undefined;
      state.lowerPrice = 0;
      state.auction_id = "" as string | undefined;
    },
  },
});

export const {
  openBidCustomModal,
  closeBidCustomModal,
  resetBidCustomModal,
  setBidData,
} = bidCustomModalSlice.actions;

export const selectorBidCustomModal = (state: RootStateType) =>
  state.bidCustomModal;

export default bidCustomModalSlice.reducer;
