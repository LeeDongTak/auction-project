import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";

const initialState = {
  isOpen: false,
  result: false,
  maxBidPrice: 0 as number | undefined,
};

const bidCustomModalSlice = createSlice({
  name: "bidCustomModal",
  initialState,
  reducers: {
    openBidCustomModal: (state, action: PayloadAction<number | undefined>) => {
      state.isOpen = true;
      state.maxBidPrice = action.payload;
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
