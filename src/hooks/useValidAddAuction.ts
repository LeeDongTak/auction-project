import { useAppDispatch, useAppSelector } from "../redux/config/configStore";
import { setIsAlert } from "../redux/modules/setAuctionSlice";

//경매품 추가하기 유효성 검사
export const addValidAuction = () => {
  const {
    imgFileList,
    auctionTitle,
    auctionContent,
    auctionLowerPrice,
    auctionUpperPrice,
    auctionShippingType,
    auctionProductStatus,
    categoryList,
  } = useAppSelector((state) => state.setAuction);
  const dispatch = useAppDispatch();

  //경매품 추가하기 유효성 검사
  if (imgFileList.length === 0) {
    dispatch(setIsAlert({ isAlert: true, ErrorMsg: "이미지를 등록해 주세요" }));
    return false;
  } else if (auctionTitle === "") {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "경매품 이름을 입력해 주세요" })
    );
    return false;
  } else if (auctionTitle.length > 10) {
    dispatch(
      setIsAlert({
        isAlert: true,
        ErrorMsg: "경매품 이름은 10글자 이하로 작성해 주세요",
      })
    );
    return false;
  } else if (auctionContent === "") {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "경매품 소개를 작성해 주세요" })
    );
    return false;
  } else if (auctionContent.length > 100) {
    dispatch(
      setIsAlert({
        isAlert: true,
        ErrorMsg: "경매품 소개는 100글자 이하로 작성해 주세요",
      })
    );
    return false;
  } else if (auctionUpperPrice === 0) {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "최대금액을 입력해 주세요" })
    );
    return false;
  } else if (auctionLowerPrice > auctionUpperPrice) {
    dispatch(
      setIsAlert({
        isAlert: true,
        ErrorMsg: "최소금액은 최대금액보다 작아야 합니다",
      })
    );
    return false;
  } else if (isNaN(auctionLowerPrice) || isNaN(auctionUpperPrice)) {
    dispatch(setIsAlert({ isAlert: true, ErrorMsg: "숫자만 입력해 주세요" }));
    return false;
  } else if (auctionShippingType === "") {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "배송유형을 선택해 주세요" })
    );
    return false;
  } else if (auctionProductStatus === "") {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "상품상태를 선택해 주세요" })
    );
    return false;
  } else if (categoryList.length === 0) {
    dispatch(
      setIsAlert({ isAlert: true, ErrorMsg: "카테고리를 등록해 주세요" })
    );
    return false;
  } else {
    return true;
  }
};
