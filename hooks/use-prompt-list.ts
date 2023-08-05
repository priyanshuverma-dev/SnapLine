import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePrompts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/get`,
    fetcher,
    { refreshInterval: 100, revalidateOnFocus: true }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePrompts;
