import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useFollowButton = (promptId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/profiles/follow/${promptId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useFollowButton;
