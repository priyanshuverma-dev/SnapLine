import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const useUsersPrompts = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/user/${userId}`,
    fetcher
  );

  console.log(userId);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useUsersPrompts;
