import useSWR from "swr";

import fetcher from "@/lib/fetcher";

// const noCacheFetcher = (url: string) =>
//   fetch(url, {
//     next: {
//       revalidate: 100,
//     },
//   }).then((res) => res.json());

const usePrompts = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/prompt/get`,
    fetcher,
    {
      revalidateOnFocus: true,
      refreshInterval: 1000,
      revalidateOnReconnect: true,
    }
  );

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default usePrompts;
