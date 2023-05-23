import { ReactNode } from 'react';
import { QueryClientProvider } from 'react-query';

import { queryClient } from '../config';

export const QueryClient = (component: () => ReactNode) => function () {
  return <QueryClientProvider client={queryClient}>{component()}</QueryClientProvider>;
};
