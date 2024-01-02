import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/config/configStore';
import { setAuctionProductStatus } from '../../redux/modules/setAuctionSlice';

function SetAuctionProductStatus() {
  const statusArray = ["최상", "상", "중", "하"]
  const dispatch = useAppDispatch();
  const { auctionProductStatus } = useAppSelector((state) => state.setAuction)

  const productStatusOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionProductStatus(e.target.value))
  }

  return (
    <StProductStatusWrapper>
      <StAuctionProductStatusTitle>상품 상태</StAuctionProductStatusTitle>
      <StProductStatusContentBox>
        {
          statusArray.map((item, index) => {
            return (
              <StProductStatusButtonBox key={item}>
                <StSProductStatusRadio
                  name="ProductStatus"
                  value={index}
                  type="radio"
                  onChange={(e) => { productStatusOnchangeHandler(e) }}
                  checked={
                    auctionProductStatus === String(index)
                      ? true
                      : false
                  }
                />
                <StProductStatusLabel htmlFor="">{item}</StProductStatusLabel>
              </StProductStatusButtonBox>
            )
          })
        }
      </StProductStatusContentBox>
    </StProductStatusWrapper>
  )
}

export default SetAuctionProductStatus


const StProductStatusWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`

const StAuctionProductStatusTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`
const StProductStatusContentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  font-size: 2.2em;
`

const StProductStatusButtonBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const StSProductStatusRadio = styled.input`
  width: 2em;
  height: 2em;
  margin-left: 0;
  margin-right: 20%;
`

const StProductStatusLabel = styled.label`
  text-align: center;
`
