import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootStateType } from "../config/configStore";

export type ModalType = "alert" | "confirm";

type ModalActionPayload = {
  message: string;
  modalType: ModalType;
};

const initialState = {
  isOpen: false,
  message: "",
  modalType: "",
  result: false,
};

const customModalSlice = createSlice({
  name: "customModal",
  initialState,
  reducers: {
    openCustomModal: (state, action: PayloadAction<ModalActionPayload>) => {
      state.isOpen = true;
      state.message = action.payload.message;
      state.modalType = action.payload.modalType;
    },
    closeCustomModal: (state) => {
      state.isOpen = false;
      state.message = "";
      state.modalType = "";
    },
    setCustomModalResult: (state, action: PayloadAction<boolean>) => {
      state.result = action.payload;
    },
  },
});

export const { openCustomModal, closeCustomModal, setCustomModalResult } =
  customModalSlice.actions;

export const selectorCustomModal = (state: RootStateType) => state.customModal;

export default customModalSlice.reducer;
