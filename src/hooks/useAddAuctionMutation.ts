import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddAuctionPost } from "../api/setAuction";
import { useAppDispatch } from "../redux/config/configStore";
import { setIsAlert } from "../redux/modules/setAuctionSlice";
import useDidMountEffect from "./useDidMountEffect";

export const useAddAuctionMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: AddAuctionPost,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  useDidMountEffect(() => {
    dispatch(setIsAlert({ isAlert: isPending, ErrorMsg: "로딩중..." }));
    if (isPending === false) {
      navigate("/");
    }
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      (async () => {})();
    }
  }, [isError, error]);

  return { mutate } as any;
};
