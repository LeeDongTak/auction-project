import { createSlice } from "@reduxjs/toolkit";

interface AuthProps {
  isLogin: boolean;
}

const initialState: AuthProps = {
  isLogin: false,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsLogin: (state, { payload }) => {
      state.isLogin = payload;
    },
  },
});

export const { toggleIsLogin } = AuthSlice.actions;
export default AuthSlice.reducer;
