import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";
import { Bids } from "../../types/databaseRetrunTypes";

type BidCustomModalActionPayload = {
  maxBid: Bids | undefined;
  auction_id: string | undefined;
};
const initialState = {
  isOpen: false,
  result: false,
  maxBid: {} as Bids | undefined,
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
      console.log(action.payload.maxBid);
      state.maxBid = action.payload.maxBid;
      state.auction_id = action.payload.auction_id;
    },
    closeBidCustomModal: (state) => {
      state.isOpen = false;
      state.maxBid = {} as Bids | undefined;
    },
  },
});

export const { openBidCustomModal, closeBidCustomModal } =
  bidCustomModalSlice.actions;

export const selectorBidCustomModal = (state: RootStateType) =>
  state.bidCustomModal;

export default bidCustomModalSlice.reducer;
