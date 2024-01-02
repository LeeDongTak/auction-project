import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deleteAuctionPost } from "../api/setAuction";
import { useAppDispatch } from "../redux/config/configStore";

export const useDeleteAuctionMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: deleteAuctionPost,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  // useDidMountEffect(() => {
  //   dispatch(setIsAlert({ isAlert: isPending, ErrorMsg: "로딩중..." }));
  //   if (isPending === false) {
  //     navigate("/");
  //     dispatch(resetState());
  //   }
  // }, [isPending]);

  useEffect(() => {
    if (isPending) {
      (async () => {})();
    }
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      (async () => {})();
    }
  }, [isError, error]);

  return { mutate } as any;
};
