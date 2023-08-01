import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `api/user/${userId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUser;
