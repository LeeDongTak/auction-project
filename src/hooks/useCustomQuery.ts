import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCustomModal } from "./useCustomModal";

export function useCustomQuery<T, TError extends Error = Error>(
  queryOptions: UseQueryOptions<T, TError>
): [T | undefined, boolean] {
  let { isLoading, isError, error, data, refetch } = useQuery<T, TError>(
    queryOptions
  );

  const [isLoadingSkeleton, setIsLoadingSkeleton] = useState(true);

  const { handleOpenCustomModal } = useCustomModal();

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setIsLoadingSkeleton(isLoading);
      }, 1000);
    }
  }, [isLoading]);

  useEffect(() => {
    if (isError && !error?.message.includes("getBidMaxPrice")) {
      console.log(error?.message);
      // await handleOpenCustomModal(`오류 발생\n ${error?.message}`, "alert");
    }
  }, [isError, error]);

  return [data, isLoadingSkeleton];
}
