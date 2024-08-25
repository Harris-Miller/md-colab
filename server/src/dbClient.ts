import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { logger } from './logger';

const PG_URL = process.env.PG_URL!;

logger.info('Connecting to postgres');
logger.info(PG_URL);

const client = new Client({
  connectionString: PG_URL,
});

await client.connect();
const db = drizzle(client);

export { db };
