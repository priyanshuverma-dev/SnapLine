import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useAI = (name: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/ai/byname/${name}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useAI;
