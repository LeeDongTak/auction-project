import { createSlice } from "@reduxjs/toolkit";

interface ProfileState {
  category: string;
}

const initialState: ProfileState = {
  category: "",
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setCategory: (state, { payload }) => {
      state.category = payload;
    },
  },
});

export const { setCategory } = profileSlice.actions;

export default profileSlice.reducer;
