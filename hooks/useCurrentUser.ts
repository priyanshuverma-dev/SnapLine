import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useCurrentUserStore } from "./use-current-use-store";
import { Role, User } from "@/utils/user";

const useCurrentUser = () => {
  const userState = useCurrentUserStore();

  // Use this flag to determine whether to fetch data
  const shouldFetch = !userState.user;

  const { data, error, isLoading, mutate } = useSWR(
    shouldFetch ? "/api/current" : null,
    fetcher,
    {
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 401) return;

        if (error?.response?.data === "Unauthorized") return;
      },
      // revalidateOnFocus: true,
      // refreshInterval: 1000,
    }
  );
  // console.log(error?.response?.data);

  // Update userState if data is available
  if (data && !userState.user) {
    userState.setUser(data);
  }

  if (!data && !userState.user && error?.response?.data) {
    userState.setUser(error?.response?.data?.guest);
  }
  return {
    data: userState.user || data,
    error,
    isLoading: isLoading && shouldFetch, // Show loading only if fetching is required
    mutate,
  };
};

export default useCurrentUser;
