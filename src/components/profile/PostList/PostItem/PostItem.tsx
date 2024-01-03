import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { FaHourglassEnd, FaHourglassStart } from "react-icons/fa";
import { RiMoneyDollarCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useCustomModal } from "../../../../hooks/useCustomModal";
import { useDeleteAuctionMutation } from "../../../../hooks/useDeleteAuctionMutation";
import { useAppDispatch } from "../../../../redux/config/configStore";
import { toggleViewSearchModal } from "../../../../redux/modules/searchSlice";
import {
  Auction_images,
  Auction_post,
} from "../../../../types/databaseRetrunTypes";
import Button from "../../../common/Button";
import {
  StButtonSection,
  StImage,
  StImageSkeleton,
  StPostInfoSection,
  StPostItemWrapper,
} from "./PostItem.styles";

interface PostItemProps {
  post: Auction_post;
  type?: string;
  likeDeleteHandler?: () => void;
}

const PostItem = ({ post, type, likeDeleteHandler }: PostItemProps) => {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const { handleOpenCustomModal } = useCustomModal();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const {
    user_id,
    auction_id,
    title,
    content,
    auction_images,
    upper_limit,
    lower_limit,
    auction_start_date,
    auction_end_date,
    created_at,
    category,
  } = post;

  const createAt = dayjs(created_at).format("YYYY-MM-DD");

  const startDate = dayjs(auction_start_date).format("YYYY년 MM월 DD일");

  const endDate = dayjs(auction_end_date).format("YYYY년 MM월 DD일");

  const { mutate: deleteAuctionMutate } = useDeleteAuctionMutation();

  const upperLimit = upper_limit
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const viewContent =
    content.length > 20 ? content.slice(0, 50) + "..." : content;

  const goToDetailHandler = () => {
    navigate(`/detail/${auction_id}`);
    dispatch(toggleViewSearchModal(false));
  };

  const editHandler = () => {
    navigate(`/setAuction/${auction_id}`);
  };

  const deleteHandler = async () => {
    if (!(await handleOpenCustomModal("삭제하시겠습니까?", "confirm"))) return;

    interface deleteDataType {
      auction_id?: string;
      auction_images?: Auction_images[];
    }
    const deleteAuctionData: deleteDataType = {
      auction_id,
      auction_images,
    };
    deleteAuctionMutate(deleteAuctionData);
  };

  return (
    <StPostItemWrapper>
      {isLoading ? (
        <StImageSkeleton active></StImageSkeleton>
      ) : (
        <StImage onClick={goToDetailHandler}>
          <img src={auction_images?.[0]?.image_path} alt="" />
        </StImage>
      )}

      <Skeleton loading={isLoading} active title paragraph={{ rows: 5 }}>
        <div>
          <StPostInfoSection onClick={goToDetailHandler}>
            <div>
              <h3>{title}</h3>
              <span>{createAt}</span>
              <p>{viewContent}</p>
            </div>
            <div>
              <p>
                <RiMoneyDollarCircleLine /> 시작 가격: {lower_limit}원
              </p>
              <p>
                <FaHourglassStart /> 시작일: {startDate}
              </p>
              <p>
                <FaHourglassEnd /> 종료일: {endDate}
              </p>
            </div>
            <p>카테고리: {category?.category_name}</p>
          </StPostInfoSection>
          {type === "내 게시물" && (
            <StButtonSection>
              <Button text="수정" onClickHandler={editHandler} />
              <Button text="삭제" onClickHandler={deleteHandler} />
            </StButtonSection>
          )}
          {type === "찜한 목록" && (
            <StButtonSection>
              <Button
                text="삭제"
                mode="dark"
                onClickHandler={likeDeleteHandler}
              />
            </StButtonSection>
          )}
        </div>
      </Skeleton>
    </StPostItemWrapper>
  );
};

export default PostItem;
