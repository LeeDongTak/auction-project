import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";

interface CounterState {
  isAlert: boolean;
  alertMsg: string;
  imgFileList: File[];
  auctionTitle: string;
  auctionContent: string;
  auctionLowerPrice: number;
  auctionUpperPrice: number;
  auctionShippingType: string;
  auctionProductStatus: string;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  // categoryList: string[];
  categoryList: string;
}

const initialState: CounterState = {
  isAlert: false,
  alertMsg: "",
  imgFileList: [],
  auctionTitle: "",
  auctionContent: "",
  auctionLowerPrice: 0,
  auctionUpperPrice: 0,
  auctionShippingType: "",
  auctionProductStatus: "",
  startDate: moment().format("YYYY-MM-DD"),
  endDate: moment(moment().format("YYYY-MM-DD"))
    .add(7, "days")
    .format("YYYY-MM-DD"),
  startTime: moment().format("HH:mm"),
  endTime: moment().format("HH:mm"),
  // categoryList: [],
  categoryList: "",
};

const setAuctionSlice = createSlice({
  name: "setAuction",
  initialState,
  reducers: {
    setIsAlert: (
      state,
      action: PayloadAction<{ isAlert: boolean; ErrorMsg: string }>
    ) => {
      state.isAlert = action.payload.isAlert;
      state.alertMsg = action.payload.ErrorMsg;
    },
    setImageFileList: (state, action: PayloadAction<File>) => {
      state.imgFileList.push(action.payload);
    },
    setAuctionTitle: (state, action: PayloadAction<string>) => {
      state.auctionTitle = action.payload;
    },
    setAuctionContent: (state, action: PayloadAction<string>) => {
      state.auctionContent = action.payload;
    },
    setAuctionLowerPrice: (state, action: PayloadAction<number>) => {
      state.auctionLowerPrice = action.payload;
    },
    setAuctionUpperPrice: (state, action: PayloadAction<number>) => {
      state.auctionUpperPrice = action.payload;
    },
    setAuctionShippingType: (state, action: PayloadAction<string>) => {
      state.auctionShippingType = action.payload;
    },
    setAuctionProductStatus: (state, action: PayloadAction<string>) => {
      state.auctionProductStatus = action.payload;
    },
    setAuctionStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
      state.endDate = moment(action.payload)
        .add(7, "days")
        .format("YYYY-MM-DD");
    },
    setAuctionEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    setAuctionStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    setAuctionEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    // setAuctionCategoryList: (
    //   state,
    //   action: PayloadAction<{ id: string; checked: boolean }>
    // ) => {
    //   if (!action.payload.checked) {
    //     state.categoryList = state.categoryList.filter(
    //       (x) => x !== action.payload.id
    //     );
    //   } else if (state.categoryList.length > 4) {
    //     return;
    //   } else if (action.payload.checked) {
    //     state.categoryList.push(action.payload.id);
    //   }
    // },

    setAuctionCategoryList: (state, action: PayloadAction<string>) => {
      state.categoryList = action.payload;
    },
  },
});

export const {
  setIsAlert,
  setImageFileList,
  setAuctionTitle,
  setAuctionContent,
  setAuctionLowerPrice,
  setAuctionUpperPrice,
  setAuctionShippingType,
  setAuctionProductStatus,
  setAuctionStartDate,
  setAuctionEndDate,
  setAuctionStartTime,
  setAuctionEndTime,
  setAuctionCategoryList,
} = setAuctionSlice.actions;
export default setAuctionSlice.reducer;
