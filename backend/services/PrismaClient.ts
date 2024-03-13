import { injectable } from 'inversify';
import { PrismaClient } from '@prisma/client';

@injectable()
export class PrismaClientService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: process.env.DATABASE_URL } } });
  }
}
