import { useEffect, useRef } from "react"
import { styled } from "styled-components"
import { useAppSelector } from "../../redux/config/configStore"

function SetAuctionAlert() {
  const { isAlert, alertMsg } = useAppSelector((state) => state.setAuction)
  const alertRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (alertMsg !== "로딩중...") {
      setTimeout(() => {
        alertRef?.current?.style.setProperty('opacity', '0')
      }, 500)
    }
  }, [isAlert])

  return (
    <StAlert ref={alertRef}>
      {
        alertMsg === "로딩중..." &&
        <>
          <StLoadingImg src="https://blog.kakaocdn.net/dn/c3Rwqs/btqVugu1Dvv/SWkENtL39bcQ7fTrWNBxu0/img.gif" alt="" />
          &nbsp;&nbsp;&nbsp;
        </>
      }
      <span>{alertMsg}</span>
    </StAlert>
  )
}

export default SetAuctionAlert

const StAlert = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  opacity: 1;
  transition: 3s;
  transform: translate(-50%,-50%);
  padding: 3% 6%;
  border-radius: 0.3em;
  box-shadow: 0 0 0.2em 0 #000;
  font-size: 3em;
  text-align: center;
  color: #fff;
  line-height:1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0,0,0,0.7);
`
const StLoadingImg = styled.img`
  width: 1.5em;
  height: 1.5em;
  /* margin-right: 5% */
`