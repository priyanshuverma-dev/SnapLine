import useSWR from "swr";

import fetcher from "@/lib/fetcher";
import { API_URL } from "@/utils/base";

const noCacheFetcher = (url: string) =>
  fetch(url, {
    // cache: "no-cache",
  }).then((res) => res.json());

const url = API_URL;

const useProfiles = (userId: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `${url}/api/profiles/${userId}`,
    noCacheFetcher
  );
  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default useProfiles;
