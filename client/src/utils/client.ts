import { createTRPCReact, httpBatchLink, httpLink, splitLink } from '@trpc/react-query';

import { AppRouter } from '#backend/router';
import { api } from './api';

import superjson from 'superjson';

export const trpc = createTRPCReact<AppRouter>();

export const createClient = () =>
  trpc.createClient({
    transformer: superjson,
    links: [
      splitLink({
        condition(op) {
          return op.context.skipBatch === true;
        },
        true: httpLink({
          url: api.API,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
        false: httpBatchLink({
          url: api.API,
          maxURLLength: 5000,
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      }),
    ],
  });
