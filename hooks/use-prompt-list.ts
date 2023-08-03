import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePrompts = () => {
  const { data, error, isLoading, mutate } = useSWR(`/api/prompt/get`, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePrompts;
