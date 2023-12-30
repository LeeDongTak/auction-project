import { useAppDispatch } from "../redux/config/configStore";
import { fetchAuctionMaxBid } from "../api/bid";
import { useCustomQuery } from "./useCustomQuery";
import { MaxBids } from "../types/databaseRetrunTypes";
import { setBidData } from "../redux/modules/bidCustomModalSlice";
import { useEffect } from "react";

const useDetailBidState = (auctionId: string, lowerPrice: number = 0) => {
  const dispatch = useAppDispatch();

  const queryBidOptions = {
    queryKey: ["getBidMaxPrice", auctionId],
    queryFn: () => fetchAuctionMaxBid(auctionId),
    queryOptions: { staleTime: 0 },
    enabled: !!auctionId,
  };

  const [bidData] = useCustomQuery<MaxBids, Error>(queryBidOptions);

  useEffect(() => {
    if (bidData)
      dispatch(
        setBidData({
          maxBid: bidData,
          lowerPrice,
          auction_id: auctionId,
        })
      );
    else dispatch(setBidData({ lowerPrice, auction_id: auctionId }));
  }, [bidData]);
};

export default useDetailBidState;
