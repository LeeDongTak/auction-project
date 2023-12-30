import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { styled } from "styled-components";
import { useAppDispatch } from "../../redux/config/configStore";
import { setImageFileList } from "../../redux/modules/setAuctionSlice";


function SetAuctionImage() {
  const dispatch = useAppDispatch()
  const [imgArray, setImgArray] = useState<string[]>([])
  const imgRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    imgRef?.current?.click();
  };

  const onchangeImgUrlHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const files = (target.files as FileList)[0];

    dispatch(setImageFileList(files));
    let reader = new FileReader();
    reader.onload = (event) => {
      const result = event?.target?.result as string;
      setImgArray([...imgArray, result])
    };
    reader.readAsDataURL(files);
  };

  const onClickImgUrlCloseHandler = (imgUrl: string) => {
    setImgArray([...imgArray.filter((x) => x !== imgUrl)])
  }

  return (
    <StImageWrapper>
      <StImageTitle>이미지 등록</StImageTitle>
      <StImageUl>
        {
          imgArray.map((item, index) => <StImageLi onClick={() => { onClickImgUrlCloseHandler(item) }} key={index} $imgUrl={item} />)
        }
        <input style={{ display: "none" }} type="file" ref={imgRef} onChange={(event) => { onchangeImgUrlHandler(event) }} />
        {imgArray.length < 4 &&
          <StImageButton onClick={handleClick}>
            <StPlus className="plus" />
          </StImageButton>
        }
      </StImageUl>
    </StImageWrapper>
  )
}

export default SetAuctionImage

const StImageWrapper = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 5em;
`

const StImageTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
`

const StImageUl = styled.ul`
  width: auto;
  height: auto;
  display: flex;
`

const StImageLi = styled.li<{ $imgUrl?: string }>`
  width: 20em;
  height: 15em;
  border-radius: 1em;
  margin-right: 2em;
  background: url(${({ $imgUrl }) => $imgUrl});
  background-size: cover;
  box-shadow: 0 0 0.5em 0 #023E7D;
  transition: 0.1s;
  position: relative;
  cursor: pointer;
  &:hover{
    /* background-image: none; */
    background: #023E7D;
    &::before{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
      content: "";
      background-color: #FFFACD;
      font-size: 2em;
      color: #FFFACD;
      width: 2.7em;
      height: 0.4em;
      border-radius: 50px;
    }
    &::after{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
      content: "";
      background-color: #FFFACD;
      font-size: 2em;
      color: #FFFACD;
      width: 2.7em;
      height: 0.4em;
      border-radius: 50px;
    }
  }
`

const StImageButton = styled.div`
  width: 20em;
  height: 15em;
  border-radius: 1em;
  margin-right: 2em;
  background-size: cover;
  box-shadow: 0 0 0.5em 0 #023E7D;
  transition: 0.1s;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  background-color: #023E7D;
  cursor: pointer;
  transition: 0.1s;
  &:hover{
    background-color: #FFFACD;
    box-shadow: 0 0 0.5em 0 #023E7D;
  }
  &:hover > .plus{
    color: #023E7D;
  }
`
const StPlus = styled(FaPlus)`
  font-size: 6em;
  color: #FFFACD;
`
