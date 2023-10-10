import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useAIList = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/ai/get`, fetcher, {
    // revalidateOnFocus: true,
    // refreshInterval: 1000,
    // revalidateOnReconnect: true,
  });

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useAIList;
