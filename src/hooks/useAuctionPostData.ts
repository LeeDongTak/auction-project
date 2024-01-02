import { fetchGetAuctionById } from "../api/auction";
import { useCustomQuery } from "./useCustomQuery";
import { Auction_post, MaxBids } from "../types/databaseRetrunTypes";
import { useEffect } from "react";
import { useAppDispatch } from "../redux/config/configStore";
import { fetchAuctionMaxBid } from "../api/bid";
import { setBidData } from "../redux/modules/bidCustomModalSlice";
import { isEmpty } from "../common/util";
import {
  resetAuctionData,
  setAuctionData,
} from "../redux/modules/auctionSingleDataSlice";

const useAuctionPostData = (auctionId: string): [Auction_post, boolean] => {
  const dispatch = useAppDispatch();
  const queryAuctionOptions = {
    queryKey: ["getAuction", auctionId],
    queryFn: () => fetchGetAuctionById(auctionId),
    queryOptions: { staleTime: Infinity, enabled: !!auctionId },
  };

  const [data, isLoading] = useCustomQuery<Auction_post, Error>(
    queryAuctionOptions
  );

  const queryBidOptions = {
    queryKey: ["getBidMaxPrice", auctionId],
    queryFn: () => fetchAuctionMaxBid(auctionId),
    queryOptions: { staleTime: Infinity, enabled: !!auctionId },
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

  // detail data set
  useEffect(() => {
    if (data) if (!isEmpty<Auction_post>(data)) dispatch(setAuctionData(data));
  }, [data]);

  useEffect(() => {
    return () => {
      dispatch(resetAuctionData());
    };
  }, []);

  return [data || ({} as Auction_post), isLoading];
};

export default useAuctionPostData;
