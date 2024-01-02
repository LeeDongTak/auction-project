import { Bids } from "../types/databaseRetrunTypes";
import connectSupabase from "../api/connectSupabase";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import {
  RealtimePostgresChangesPayload,
  RealtimePostgresInsertPayload,
} from "@supabase/supabase-js";

const useSubscribeBidTable = (auctionId: string) => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const changeObserverHandler = async (
      payload:
        | RealtimePostgresChangesPayload<Bids>
        | RealtimePostgresInsertPayload<Bids>
    ) => {
      if ("auction_id" in payload.new) {
        if (payload.new.auction_id === auctionId) {
          await queryClient.invalidateQueries({
            queryKey: ["getBidMaxPrice", auctionId],
          });
          await queryClient.invalidateQueries({
            queryKey: ["getBidList", auctionId],
          });
        }
      }
    };

    const subscription = connectSupabase
      .channel("bids")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "bids" },
        changeObserverHandler
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "bids" },
        changeObserverHandler
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [auctionId]);
};

export default useSubscribeBidTable;
