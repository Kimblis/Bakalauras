import { FastifyTRPCPluginOptions, fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify, { FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { v4 as uuidv4 } from 'uuid';
import { handleCors, waitForServers } from './utils';
import { AppRouter, appRouter } from './router';
import { createContext } from './router/context';

export interface ServerControl {
  server: FastifyInstance;
  start: () => Promise<void>;
  stop: () => Promise<undefined>;
}

export function createServer(env: NodeJS.ProcessEnv): ServerControl {
  const { API_PORT: port, API_PREFIX: prefix } = env;

  const server = fastify({
    logger: true,
    maxParamLength: 2083,
    disableRequestLogging: true,
    genReqId() {
      return uuidv4();
    },
  });

  void server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: {
      router: appRouter,
      createContext,
      onError: ({ error }) => console.error(error),
    } satisfies FastifyTRPCPluginOptions<AppRouter>['trpcOptions'],
  });

  server.register(cors, { origin: handleCors, credentials: true });

  server.get('/health', async () => {
    return { status: 'ok' };
  });

  const stop = async (): Promise<undefined> => server.close();
  const start = async (): Promise<void> => {
    try {
      await waitForServers();
      await server.listen({ port: parseInt(port as string, 10), host: '0.0.0.0' });
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
