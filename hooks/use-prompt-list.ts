import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePrompts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/get`,
    fetcher,
    {
      // revalidateOnFocus: true,
      // refreshInterval: 1000,
      // revalidateOnReconnect: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePrompts;
