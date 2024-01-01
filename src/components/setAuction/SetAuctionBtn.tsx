import { useParams } from 'react-router-dom'
import AddAuctionBtn from './setAuctionBtn/AddAuctionBtn'
import UpdateAuctionBtn from './setAuctionBtn/UpdateAuctionBtn'

function SetAuctionBtn() {
  const { auctionId } = useParams()
  if (auctionId) {
    return <UpdateAuctionBtn isParams="수정하기" />
  }
  return <AddAuctionBtn isParams="등록하기" />
}

export default SetAuctionBtn