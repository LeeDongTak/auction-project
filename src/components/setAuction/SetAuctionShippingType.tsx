import { styled } from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../redux/config/configStore';
import { setAuctionShippingType } from '../../redux/modules/setAuctionSlice';

function SetAuctionShippingType() {
  const statusArray = ["직거래", "택배"]
  const dispatch = useAppDispatch();
  const { auctionShippingType } = useAppSelector((state) => state.setAuction);

  const shippingTypeOnchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setAuctionShippingType(e.target.value))
  }
  return (
    <StShippingTypeWrapper>
      <StAuctionShippingTypeTitle>배송 유형</StAuctionShippingTypeTitle>
      <StShippingTypeContentBox>
        {
          statusArray.map((item, index) => {
            return (
              <StShippingTypeButtonBox key={item}>
                <StShippingTypeRadio
                  name="shippingType"
                  value={index}
                  type="radio"
                  onChange={(e) => { shippingTypeOnchangeHandler(e) }}
                  checked={
                    auctionShippingType === String(index)
                      ? true
                      : false
                  }
                />
                <StShippingTypeLabel>{item}</StShippingTypeLabel>
              </StShippingTypeButtonBox>
            )
          })
        }
      </StShippingTypeContentBox>
    </StShippingTypeWrapper>
  )
}

export default SetAuctionShippingType


const StShippingTypeWrapper = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 5em;
`

const StAuctionShippingTypeTitle = styled.div`
  width: 100%;
  font-size: 2.5em;
  padding: 1.5em 0;
  display: flex;
`
const StShippingTypeContentBox = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: space-between;
  font-size: 2.2em;
`

const StShippingTypeButtonBox = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`

const StShippingTypeRadio = styled.input`
  flex: 1;
  width: 2em;
  height: 2em;
  margin: 0;
`

const StShippingTypeLabel = styled.label`
  flex: 1;
`
