import { OriginFunction } from '@fastify/cors';
import { TRPCError } from '@trpc/server';

const originWhitelist = ['localhost'];

export const handleCors: OriginFunction = (origin, cb) => {
  if (!origin) {
    cb(null, false);
    return;
  }

  const hostname = new URL(origin).hostname;
  if (originWhitelist.includes(hostname)) {
    //  Request from localhost will pass
    cb(null, true);
    return;
  }

  //Generate an error on other origins, disabling access
  console.error(`Origin: ${origin} was not allowed by cors`);
  cb(new TRPCError({ code: 'UNAUTHORIZED', message: 'Origin not allowed by cors' }), false);
};
