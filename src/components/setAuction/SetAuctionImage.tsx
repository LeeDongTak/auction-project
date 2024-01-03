import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/config/configStore";
import {
  setCloseImageFileList,
  setImageFileList,
  setImageUrlList,
} from "../../redux/modules/setAuctionSlice";

interface imgType {
  imgFile: File;
  imgUrl?: string;
}

function SetAuctionImage() {
  const { auctionId } = useParams();
  const dispatch = useAppDispatch();
  const [imgArray, setImgArray] = useState<imgType[]>([]);
  const imgRef = useRef<HTMLInputElement>(null);
  const { imgFileList, imgUrlList } = useAppSelector(
    (state) => state.setAuction
  );
  // console.log(imgFileList)
  const handleClick = () => {
    imgRef?.current?.click();
  };

  const onchangeImgUrlHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];

    let reader = new FileReader();
    reader.onload = (event) => {
      const imgUrl = event?.target?.result as string;
      dispatch(setImageFileList(files));
      dispatch(setImageUrlList(imgUrl));
    };
    reader.readAsDataURL(files);
  };

  const onClickImgUrlCloseHandler = (img: imgType) => {
    dispatch(setCloseImageFileList({ files: img.imgFile, imgUrl: img.imgUrl }));
  };

  useEffect(() => {
    let imgData = [];
    for (let i = 0; i < imgUrlList.length; i++) {
      imgData.push({
        imgFile: imgFileList[i],
        imgUrl: imgUrlList?.[i],
      } as imgType);
    }
    setImgArray([...imgData]);
  }, [imgFileList, imgUrlList]);
  return (
    <StImageWrapper>
      <StImageTitle>{!auctionId ? "이미지 등록" : "이미지 수정"}</StImageTitle>
      <StImageUl>
        {imgArray.map((item, index) => (
          <StImageLi
            onClick={() => {
              onClickImgUrlCloseHandler(item);
            }}
            key={index}
            $imgUrl={item.imgUrl}
          />
        ))}
        <input
          style={{ display: "none" }}
          type="file"
          ref={imgRef}
          onChange={(event) => {
            onchangeImgUrlHandler(event);
          }}
        />
        {imgArray.length < 4 && (
          <StImageButton onClick={handleClick}>
            <StPlus className="plus" />
          </StImageButton>
        )}
      </StImageUl>
    </StImageWrapper>
  );
}

export default SetAuctionImage;

const StImageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5em;
`;

const StImageTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
`;

const StImageUl = styled.ul`
  width: auto;
  height: auto;
  display: flex;
`;

const StImageLi = styled.li<{ $imgUrl?: string }>`
  width: 20em;
  height: 15em;
  border-radius: 1em;
  margin-right: 2em;
  background: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  box-shadow: 0 0 0.5em 0 #023e7d;
  transition: 0.1s;
  position: relative;
  cursor: pointer;
  &:hover {
    /* background-image: none; */
    background: #023e7d;
    &::before {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      content: "";
      background-color: #fffacd;
      font-size: 2em;
      color: #fffacd;
      width: 2.7em;
      height: 0.4em;
      border-radius: 50px;
    }
    &::after {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      content: "";
      background-color: #fffacd;
      font-size: 2em;
      color: #fffacd;
      width: 2.7em;
      height: 0.4em;
      border-radius: 50px;
    }
  }
`;

const StImageButton = styled.div`
  width: 20em;
  height: 15em;
  border-radius: 1em;
  margin-right: 2em;
  background-size: cover;
  box-shadow: 0 0 0.5em 0 #023e7d;
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  background-color: #023e7d;
  cursor: pointer;
  transition: 0.1s;
  &:hover {
    background-color: #fffacd;
    box-shadow: 0 0 0.5em 0 #023e7d;
  }
  &:hover > .plus {
    color: #023e7d;
  }
`;
const StPlus = styled(FaPlus)`
  font-size: 6em;
  color: #fffacd;
`;
