import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import auctionTimestamp from "../modules/auctionTimestampSlice";
import bidCustomModal from "../modules/bidCustomModalSlice";
import customModal from "../modules/customModalSlice";
import profile from "../modules/profileSlice";
import search from "../modules/searchSlice";
import setAuction from "../modules/setAuctionSlice";

const store = configureStore({
  reducer: {
    setAuction,
    auctionTimestamp,
    profile,
    bidCustomModal,
    customModal,
    search,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type RootStateType = ReturnType<typeof store.getState>;
export default store;
