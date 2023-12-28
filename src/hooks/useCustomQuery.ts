import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { useEffect } from "react";

export function useCustomQuery<T, TError extends Error = Error>(
  queryOptions: UseQueryOptions<T, TError>
): T | undefined {
  const { isLoading, isError, error, data, refetch } = useQuery<T, TError>(
    queryOptions
  );

  useEffect(() => {
    // loading 처리
    if (isLoading) {
      console.log("isLoading ", isLoading);
    }
  }, [isLoading]);

  useEffect(() => {
    // error 처리
    if (isError) {
      console.log("isError ", error);
    }
  }, [isError, error]);

  return data;
}
