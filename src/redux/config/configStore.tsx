import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import template from "../modules/templateSlice";
import auctionTimestamp from "../modules/auctionTimestampSlice";
import profile from "../modules/profileSlice";
import bidCustomModal from "../modules/bidCustomModalSlice";
import customModal from "../modules/customModalSlice";

const store = configureStore({
  reducer: { template, auctionTimestamp, profile, bidCustomModal, customModal },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
