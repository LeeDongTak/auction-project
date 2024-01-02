import dayjs from "dayjs";
import { FaPlus } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useAddAuctionMutation } from "../../../hooks/useAddAuctionMutation";
import { useAppDispatch, useAppSelector } from "../../../redux/config/configStore";
import { setIsAlert } from "../../../redux/modules/setAuctionSlice";
import { Insert_auction_post } from "../../../types/databaseRetrunTypes";

function AddAuctionBtn({ isParams }: { isParams: string }) {
  const {
    imgFileList,
    auctionTitle,
    auctionContent,
    auctionLowerPrice,
    auctionUpperPrice,
    auctionShippingType,
    auctionProductStatus,
    startDate,
    startTime,
    endDate,
    endTime,
    categoryList,
  } = useAppSelector((state) => state.setAuction);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const accessTokenJson: string | null = localStorage.getItem("sb-fzdzmgqtadcebrhlgljh-auth-token")
  const accessToken = accessTokenJson && JSON.parse(accessTokenJson)

  const { mutate } = useAddAuctionMutation()
  const onclickAddAuctionHandler = () => {
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
    }
    //  else if (auctionUpperPrice === 0) {
    //   dispatch(
    //     setIsAlert({ isAlert: true, ErrorMsg: "최대금액을 입력해 주세요" })
    //   );
    //   return false;
    // } else if (auctionLowerPrice > auctionUpperPrice) {
    //   dispatch(
    //     setIsAlert({
    //       isAlert: true,
    //       ErrorMsg: "최소금액은 최대금액보다 작아야 합니다",
    //     })
    //   );
    //   return false;
    // }
    else if (isNaN(auctionLowerPrice) || isNaN(auctionUpperPrice)) {
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

      const newAuctionData: Insert_auction_post = {
        title: auctionTitle,
        auction_start_date: `${startDate} ${startTime}`,
        auction_end_date: `${endDate} ${endTime}`,
        product_status: auctionProductStatus,
        shipping_type: auctionShippingType,
        upper_limit: auctionUpperPrice,
        lower_limit: auctionLowerPrice,
        content: auctionContent,
        auction_status: dayjs().format("YYYY-MM-DD HH:mm") < `${startDate} ${startTime}` ? "0" : '1',
        user_id: accessToken.user.id,
        category_id: categoryList
      }
      const addAuctionData: {
        newAuctionData: Insert_auction_post;
        imgFileList: File[];
      } = { newAuctionData, imgFileList }

      mutate(addAuctionData)
    }
  }
  return (
    <StButtonWrapper>
      <StButton $isParams={isParams} onClick={() => {
        onclickAddAuctionHandler()
      }}>
        <StPlus className="plus" />
      </StButton>
    </StButtonWrapper>
  )
}

export default AddAuctionBtn

const StButtonWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #000;
  visibility: hidden;
  width: 1200px;
  margin: 0;
  height: 100vh;
`

const StButton = styled.button<{ $isParams?: string }>`
  position: absolute;
  right: 0%;
  bottom: 5%;
  background-color: #023E7D;
  visibility: visible;
  width: 6em;
  height: 6em;
  border: 0;
  border-radius: 1em;
  cursor: pointer;
  box-shadow: 0 0 0.5em 0 #023E7D;
  transition: 0.1s;
  &:hover{
    background-color: #FFFACD;
    &::before{
      position: absolute;
      color: #023E7D;
      top: -2em;
      left: 50%;
      width: 5em;
      font-size: 2em;
      transform: translateX(-50%);
      content: "${({ $isParams }) => $isParams}";
    }
  }
  &:hover > .plus{
    color: #023E7D;
  }
`
const StPlus = styled(FaPlus)`
  font-size: 3em;
  color: #FFFACD;
`
