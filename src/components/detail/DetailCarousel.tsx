import { Auction_images } from "../../types/databaseRetrunTypes";
import { Carousel } from "antd";
import { styled } from "styled-components";

interface Props {
  images: Auction_images[];
  title: string;
}

const DetailCarousel = ({ images, title }: Props) => {
  return (
    <StCarousel effect={"fade"} autoplay autoplaySpeed={5000}>
      {images.map((image) => (
        <StImage key={image.image_id} src={image.image_path} alt={title} />
      ))}
    </StCarousel>
  );
};

const StCarousel = styled(Carousel)`
  width: 100%;
  height: 100%;
`;
const StImage = styled.img`
  object-fit: cover;
  height: 320px;
`;
export default DetailCarousel;
