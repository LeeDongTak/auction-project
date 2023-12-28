import { createSlice } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";

const initialState = {
  isOpen: false,
  result: false,
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
  },
});

export const { openBidCustomModal, closeBidCustomModal } =
  bidCustomModalSlice.actions;

export const selectorBidCustomModal = (state: RootStateType) =>
  state.bidCustomModal;

export default bidCustomModalSlice.reducer;
