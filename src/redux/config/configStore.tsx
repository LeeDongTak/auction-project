import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import profile from "../modules/profileSlice";
import template from "../modules/templateSlice";

const store = configureStore({
  reducer: { template, profile },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
