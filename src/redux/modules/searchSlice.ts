import { createSlice } from "@reduxjs/toolkit";

interface SearchState {
  viewSearchModal: boolean;
}

const initialState: SearchState = {
  viewSearchModal: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    toggleViewSearchModal: (state, { payload }) => {
      state.viewSearchModal = payload;
    },
  },
});

export const { toggleViewSearchModal } = searchSlice.actions;

export default searchSlice.reducer;
