import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { AppRouter } from '#backend/router';
import { createTRPCReact } from '@trpc/react-query';

import { createClient } from './utils/client';

export const trpc = createTRPCReact<AppRouter>();

const TrpcProvider = ({ children }: { children: JSX.Element }) => {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(createClient);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default TrpcProvider;
