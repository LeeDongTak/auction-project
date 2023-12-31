import { fetchDeleteQuestion, fetchUpdateQuestion } from "../api/qna";
import { useCustomMutation } from "./useCustomMutation";
import { useCustomModal } from "./useCustomModal";
import { useQueryClient } from "@tanstack/react-query";
import React from "react";

type SetIsUpdate = React.Dispatch<React.SetStateAction<boolean>>;
const useQnaTanstackQuery = (auctionId: string, setIsUpdate: SetIsUpdate) => {
  const queryClient = useQueryClient();
  const { handleOpenCustomModal } = useCustomModal();
  const questionDeleteMutationOptions = {
    mutationFn: fetchDeleteQuestion,
    onSuccess: async () => {
      await handleOpenCustomModal("삭제 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });
    },
  };

  const questionUpdateMutationOptions = {
    mutationFn: fetchUpdateQuestion,
    onSuccess: async () => {
      await handleOpenCustomModal("수정 완료 되었습니다.", "alert");
      await queryClient.invalidateQueries({
        queryKey: ["questions", auctionId],
      });
      setIsUpdate(false);
    },
  };

  const deleteMutate = useCustomMutation(questionDeleteMutationOptions);
  const updateMutate = useCustomMutation(questionUpdateMutationOptions);

  return { deleteMutate, updateMutate };
};

export default useQnaTanstackQuery;
