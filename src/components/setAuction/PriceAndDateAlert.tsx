import { styled } from 'styled-components'

function PriceAndDateAlert({ alertType }: { alertType: string }) {
  return (
    <StPriceAndDateWrapper $alertType={alertType}>
      경매기간 중 변경 불가
    </StPriceAndDateWrapper>
  )
}

export default PriceAndDateAlert

const StPriceAndDateWrapper = styled.div<{ $alertType?: string }>`
  position: absolute;
  top: 0;
  left: ${({ $alertType }) => $alertType === "date" ? "-11%" : "-5%"};
  z-index: 99;
  width: ${({ $alertType }) => $alertType === "date" ? "125%" : "110%"};
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #f00;
  font-size: 3.5em;
  font-weight: bold;
  text-shadow: 0 0 0.5em #fff;
  background-color: rgba(0,0,0,0.3);
`