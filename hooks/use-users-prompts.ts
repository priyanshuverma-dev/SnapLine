import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUsersPrompts = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/user/${userId}`,
    fetcher
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsersPrompts;
