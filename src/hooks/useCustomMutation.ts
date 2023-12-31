import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { useEffect } from "react";
import { useCustomModal } from "./useCustomModal";

export type TMutationOptions<T> = UseMutationOptions<
  unknown,
  Error,
  T,
  unknown
>;

export const useCustomMutation = <T>(mutationOptions: TMutationOptions<T>) => {
  const { handleOpenCustomModal } = useCustomModal();
  const { isPending, isError, error, mutate } = useMutation<
    unknown,
    Error,
    T,
    unknown
  >(mutationOptions);

  useEffect(() => {}, [isPending]);

  useEffect(() => {
    if (isError) {
      (async () => {
        await handleOpenCustomModal(error.message, "alert");
      })();
    }
  }, [isError, error]);

  return mutate;
};
