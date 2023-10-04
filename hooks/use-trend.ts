import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useTrend = (slug: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/trends/byslug/${slug}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useTrend;
