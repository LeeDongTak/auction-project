import { useParams } from 'react-router-dom'
import { Auction_post, Bids } from '../../types/databaseRetrunTypes'
import AddAuctionBtn from './setAuctionBtn/AddAuctionBtn'
import UpdateAuctionBtn from './setAuctionBtn/UpdateAuctionBtn'

function SetAuctionBtn({ data, bidsData }: { data?: Auction_post, bidsData?: Bids }) {
  const { auctionId } = useParams()
  if (auctionId) {
    return <UpdateAuctionBtn bidsData={bidsData} data={data} isParams="수정하기" />
  }
  return <AddAuctionBtn isParams="등록하기" />
}

export default SetAuctionBtn