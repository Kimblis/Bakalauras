import Url from 'url-parse';
import wait from 'wait-port';

export const waitForServers = async () => {
  // const redisUrl = new Url(process.env?.REDIS_URL as string);
  const databaseUrl = new Url(process.env?.DATABASE_URL as string);

  // await wait({ host: redisUrl.hostname, port: parseInt(redisUrl.port) });
  await wait({ host: databaseUrl.hostname, port: parseInt(databaseUrl.port) });
};
