import { QueryClient } from 'react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // number of retries before displaying an error
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false, // don't refetch data when window/tab is focused
      refetchOnReconnect: true,
      cacheTime: 5 * 60 * 1000, // cache data for 5 minutes
    },
  },
});
