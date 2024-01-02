import { Skeleton } from "antd";
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { useDeleteAuctionMutation } from "../../../../hooks/useDeleteAuctionMutation";
import { useAppDispatch } from "../../../../redux/config/configStore";
import { resetImageList, setAuctionCategoryList, setAuctionContent, setAuctionEndDate, setAuctionEndTime, setAuctionLowerPrice, setAuctionProductStatus, setAuctionShippingType, setAuctionStartDate, setAuctionStartTime, setAuctionTitle, setAuctionUpperPrice } from "../../../../redux/modules/setAuctionSlice";
import { Auction_images, Auction_post } from "../../../../types/databaseRetrunTypes";
import Button from "../../../common/Button";

interface PostItemProps {
  post: Auction_post;
  type?: string;
}

const PostItem = ({ post, type }: PostItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const {
    auction_id,
    title,
    content,
    auction_images,
    upper_limit,
    auction_start_date,
    auction_end_date,
    created_at,
    category,
  } = post;

  const createAt = dayjs(created_at).format("YYYY-MM-DD");
  const startDate = dayjs(auction_start_date).format("YYYY년 MM월 DD일");
  const endDate = dayjs(auction_end_date).format("YYYY년 MM월 DD일");
  const { mutate } = useDeleteAuctionMutation()
  const upperLimit = upper_limit
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const viewContent =
    content.length > 20 ? content.slice(0, 50) + "..." : content;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const goToDetailHandler = () => {
    navigate(`/detail/${auction_id}`);
  };

  const editHandler = () => {
    // 수정전 redux초기화
    dispatch(resetImageList())
    dispatch(setAuctionTitle(""))
    dispatch(setAuctionContent(""))
    dispatch(setAuctionLowerPrice(0))
    dispatch(setAuctionUpperPrice(0))
    dispatch(setAuctionShippingType(""))
    dispatch(setAuctionProductStatus(""))
    dispatch(setAuctionStartDate(moment().format("YYYY-MM-DD")))
    dispatch(setAuctionEndDate(moment(moment().format("YYYY-MM-DD"))
      .add(7, "days")
      .format("YYYY-MM-DD")))
    dispatch(setAuctionStartTime("00:00"))
    dispatch(setAuctionEndTime("00:00"))
    dispatch(setAuctionCategoryList(""))
    navigate(`/setAuction/${auction_id}`);
  };

  const deleteHandler = () => {
    if (window.confirm("정말로 삭제하시겠습니까?")) {
      interface deleteDataType {
        auction_id?: string
        auction_images?: Auction_images[]
      }
      const deleteAuctionData: deleteDataType = {
        auction_id,
        auction_images
      }
      mutate(deleteAuctionData)
    } else {
      return
    }
  };
  return (
    <StPostItemWrapper>
      {isLoading ? (
        <StImageSkeleton active></StImageSkeleton>
      ) : (
        <StImage>
          <img src={auction_images?.[0]?.image_path} alt="" />
        </StImage>
      )}

      <Skeleton loading={isLoading} active title paragraph={{ rows: 5 }}>
        <div>
          <StPostInfoSection>
            <div>
              <h3>{title}</h3>
              <span>{createAt}</span>
              <p>{viewContent}</p>
            </div>
            <div>
              <p>최고 경매가: {upperLimit}원</p>
              <p>시작일: {startDate}</p>
              <p>종료일: {endDate}</p>
            </div>
            <p>카테고리: {category?.category_name}</p>
          </StPostInfoSection>
          {type === "내 게시물" && (
            <StButtonSection>
              <Button text="수정" onClickHandler={editHandler} />
              <Button text="삭제" onClickHandler={deleteHandler} />
            </StButtonSection>
          )}
        </div>
      </Skeleton>
    </StPostItemWrapper>
  );
};

const StButtonSection = styled.section`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  width: 100%;
`;

const StPostItemWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0px 0px 7px #d9d9d9;
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.03);
    background-color: #eee;
    ${StButtonSection} {
      opacity: 100%;
    }
  }

  > div {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 220px;
  }

  ${StButtonSection} {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
`;

const StImage = styled.div`
  width: 300px;
  height: 220px;
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  img {
    width: inherit;
    height: inherit;
    object-fit: cover;
    @media (max-width: 650px) {
      object-fit: contain;
    }
  }

  @media (max-width: 650px) {
    width: 250px;
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    width: 150px;
    margin-right: 1rem;
  }
`;

const StPostInfoSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 0.5rem;
  width: 100%;

  > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  h3 {
    font-size: large;
    font-weight: 500;
  }

  span {
    font-size: small;
    color: #888;
  }
`;

const StImageSkeleton = styled(Skeleton.Image)`
  width: 300px !important;
  height: 200px !important;

  svg {
    width: inherit;
    height: inherit;
    object-fit: cover;
  }

  @media (max-width: 650px) {
    width: 250px !important;
    margin-right: 1rem;
  }

  @media (max-width: 500px) {
    width: 150px !important;
    margin-right: 1rem;
  }
`;

export default PostItem;
