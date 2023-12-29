import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";

type BidCustomModalActionPayload = {
  maxBidPrice: number | undefined;
  auction_id: string | undefined;
};
const initialState = {
  isOpen: false,
  result: false,
  maxBidPrice: 0 as number | undefined,
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
      state.maxBidPrice = action.payload.maxBidPrice;
      state.auction_id = action.payload.auction_id;
    },
    closeBidCustomModal: (state) => {
      state.isOpen = false;
      state.maxBidPrice = 0;
    },
  },
});

export const { openBidCustomModal, closeBidCustomModal } =
  bidCustomModalSlice.actions;

export const selectorBidCustomModal = (state: RootStateType) =>
  state.bidCustomModal;

export default bidCustomModalSlice.reducer;
