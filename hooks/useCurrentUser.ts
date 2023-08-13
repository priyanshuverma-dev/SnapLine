import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useCurrentUserStore } from "./use-current-use-store";

const useCurrentUser = () => {
  const userState = useCurrentUserStore();

  // Use this flag to determine whether to fetch data
  const shouldFetch = !userState.user;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/current" : null,
    fetcher,
    {
      // revalidateOnFocus: true,
      // refreshInterval: 1000,
    }
  );

  // Update userState if data is available
  if (data && !userState.user) {
    userState.setUser(data);
  }

  return {
    data: userState.user || data,
    error,
    isLoading: isLoading && shouldFetch, // Show loading only if fetching is required
    mutate,
  };
};

export default useCurrentUser;
