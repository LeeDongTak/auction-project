import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { updateAuctionPost } from "../api/setAuction";
import { useAppDispatch } from "../redux/config/configStore";
import { resetState, setIsAlert } from "../redux/modules/setAuctionSlice";
import useDidMountEffect from "./useDidMountEffect";

export const useUpdateAuctionMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isPending, isError, error, mutate } = useMutation({
    mutationFn: updateAuctionPost,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  useDidMountEffect(() => {
    dispatch(setIsAlert({ isAlert: isPending, ErrorMsg: "로딩중..." }));
    if (isPending === false) {
      navigate("/profile");
      dispatch(resetState());
    }
  }, [isPending]);

  useEffect(() => {
    if (isError) {
      (async () => {})();
    }
  }, [isError, error]);

  return { mutate } as any;
};
