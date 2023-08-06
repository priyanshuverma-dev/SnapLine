import useSWR from "swr";

import fetcher from "@/lib/fetcher";

const noCacheFetcher = (url: string) =>
  fetch(url, {
    cache: "no-cache",
  }).then((res) => res.json());

const useProfiles = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${process.env.NEXT_PUBLIC_URL}/api/profiles/${userId}`,
    noCacheFetcher,
    {
      refreshInterval: 1000,
      revalidateOnReconnect: true,
      revalidateIfStale: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfiles;
