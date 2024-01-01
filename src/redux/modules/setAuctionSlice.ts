import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { Category } from "../../types/databaseRetrunTypes";

interface CounterState {
  isAlert?: boolean;
  alertMsg?: string;
  imgFileList: File[];
  imgUrlList: string[];
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
  existingCategory: Category;
}

const initialState: CounterState = {
  isAlert: false,
  alertMsg: "",
  imgFileList: [],
  imgUrlList: [],
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
  startTime: "00:00",
  endTime: "00:00",
  // categoryList: [],
  categoryList: "",
  existingCategory: {
    category_id: "",
    created_at: "",
    category_name: "",
  },
};
const setAuctionSlice = createSlice({
  name: "setAuction",
  initialState,
  reducers: {
    // alert창 을 보여주는 reducer
    setIsAlert: (
      state,
      action: PayloadAction<{ isAlert?: boolean; ErrorMsg?: string }>
    ) => {
      state.isAlert = action.payload.isAlert;
      state.alertMsg = action.payload.ErrorMsg;
    },
    // 이미지 file을 저장하는 reducer
    setImageFileList: (state, action: PayloadAction<File>) => {
      state.imgFileList?.push(action.payload);
      const set = new Set<File>(state.imgFileList);
      const array = Array.from(set);
      const imgFile = [...array];
      state.imgFileList = imgFile;
    },
    // 이미지 Url 저장하는 reducer
    setImageUrlList: (state, action: PayloadAction<string | undefined>) => {
      if (action.payload) {
        state.imgUrlList?.push(action.payload);
        const set = new Set<string>(state.imgUrlList);
        const array = Array.from(set);
        const imgUrl = [...array];
        state.imgUrlList = imgUrl;
      }
    },
    // 이미지 file을 삭제하는 reducer
    setCloseImageFileList: (
      state,
      action: PayloadAction<{ files: File; imgUrl: string | undefined }>
    ) => {
      state.imgFileList = state.imgFileList.filter(
        (x) => x !== action.payload.files
      );
      state.imgUrlList = state.imgUrlList?.filter(
        (x) => x !== action.payload.imgUrl
      );
    },
    // 경매품 제목을 저장하는 reducer
    setAuctionTitle: (state, action: PayloadAction<string>) => {
      state.auctionTitle = action.payload;
    },
    // 경매품 content를 저장하는 reducer
    setAuctionContent: (state, action: PayloadAction<string>) => {
      state.auctionContent = action.payload;
    },
    // 최소금액을 저장하는 reducer
    setAuctionLowerPrice: (state, action: PayloadAction<number>) => {
      state.auctionLowerPrice = action.payload;
    },
    // 최대금액을 저장하는 reducer
    setAuctionUpperPrice: (state, action: PayloadAction<number>) => {
      state.auctionUpperPrice = action.payload;
    },
    // 배송 유형을 선택하는 reducer
    setAuctionShippingType: (state, action: PayloadAction<string>) => {
      state.auctionShippingType = action.payload;
    },
    // 상품 상태를 저장하는 reducer
    setAuctionProductStatus: (state, action: PayloadAction<string>) => {
      state.auctionProductStatus = action.payload;
    },
    // 경매 시작 날짜를 저장하는 reducer
    setAuctionStartDate: (state, action: PayloadAction<string>) => {
      state.startDate = action.payload;
      if (state.startDate > state.endDate) {
        state.isAlert = true;
        state.alertMsg = "시작날짜는 끝나는 날짜보다 먼저 시작되어야 합니다";
        state.endDate = moment(action.payload)
          .add(7, "days")
          .format("YYYY-MM-DD");
      }
    },
    // 경매가 끝나는 날짜를 저장하는 reducer
    setAuctionEndDate: (state, action: PayloadAction<string>) => {
      state.endDate = action.payload;
    },
    // 경매 시작시간을 저장하는 reducer
    setAuctionStartTime: (state, action: PayloadAction<string>) => {
      state.startTime = action.payload;
    },
    // 경매가 끝나는 시간을 저장하는 reducer
    setAuctionEndTime: (state, action: PayloadAction<string>) => {
      state.endTime = action.payload;
    },
    // 카테고리를 여러개 저장하는 reducer
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

    // 카테고리를 저장하는 reducer
    setAuctionCategoryList: (state, action: PayloadAction<string>) => {
      state.categoryList = action.payload;
    },
    // 수정전 카테고리를 저장하는 reducer
    setAuctionExistingCategory: (state, action: PayloadAction<Category>) => {
      state.existingCategory = action.payload;
    },
  },
});

export const {
  setIsAlert,
  setImageFileList,
  setImageUrlList,
  setCloseImageFileList,
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
  setAuctionExistingCategory,
} = setAuctionSlice.actions;
export default setAuctionSlice.reducer;
