import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useTrendsList = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/trends/get`,
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

export default useTrendsList;
