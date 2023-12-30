import { Skeleton } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { Auction_post } from "../../../../types/databaseRetrunTypes";

interface PostItemProps {
  post: Auction_post;
}

const PostItem = ({ post }: PostItemProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const {
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
  const upperLimit = upper_limit
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const viewContent =
    content.length > 20 ? content.slice(0, 50) + "..." : content;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    console.log(isLoading);

    return () => clearTimeout(timer);
  }, []);

  return (
    <StPostItemWrapper>
      {isLoading ? (
        <StImageSkeleton active></StImageSkeleton>
      ) : (
        <StImage>
          <img src={auction_images?.[0].image_path} alt="" />
        </StImage>
      )}

      <Skeleton loading={isLoading} active title paragraph={{ rows: 5 }}>
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
      </Skeleton>
    </StPostItemWrapper>
  );
};

const StPostItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
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
  }
`;

const StImage = styled.div`
  width: 300px;
  height: 200px;
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
  width: 300px;
  height: 200px;

  svg {
    width: 300px;
    height: 200px;
    object-fit: cover;
  }
`;

export default PostItem;
