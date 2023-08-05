import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const usePrompt = (promptId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/byuid/${promptId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePrompt;
