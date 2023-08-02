import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUser = (username: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `api/user/${username}`,
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
