import { fetchGetAuctionById } from "../api/auction";
import { useCustomQuery } from "./useCustomQuery";
import { Auction_post, MaxBids } from "../types/databaseRetrunTypes";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/config/configStore";
import { fetchAuctionMaxBid } from "../api/bid";
import { setBidData } from "../redux/modules/bidCustomModalSlice";

const useDetailAuctionPost = (auctionId: string): [Auction_post, boolean] => {
  const dispatch = useAppDispatch();
  const queryAuctionOptions = {
    queryKey: ["getAuction"],
    queryFn: () => fetchGetAuctionById(auctionId),
    queryOptions: { staleTime: Infinity },
  };

  const [data, isLoading] = useCustomQuery<Auction_post, Error>(
    queryAuctionOptions
  );

  const queryBidOptions = {
    queryKey: ["getBidMaxPrice", auctionId],
    queryFn: () => fetchAuctionMaxBid(auctionId),
    queryOptions: { staleTime: 0, enabled: !!auctionId },
  };

  const [bidData] = useCustomQuery<MaxBids, Error>(queryBidOptions);
  useEffect(() => {
    if (!isLoading && data) {
      if (bidData)
        dispatch(
          setBidData({
            maxBid: bidData,
            lowerPrice: data.lower_limit,
            auction_id: auctionId,
          })
        );
      else
        dispatch(
          setBidData({ lowerPrice: data.lower_limit, auction_id: auctionId })
        );
    }
  }, [isLoading, data, bidData, auctionId, dispatch]);

  return [data || ({} as Auction_post), isLoading];
};

export default useDetailAuctionPost;
