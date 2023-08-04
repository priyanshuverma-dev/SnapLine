import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useProfiles = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `api/profiles/${userId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfiles;
