import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({
  connectionString: 'postgres://postgres:postgres@localhost:5432/md_colab',
});

await client.connect();
const db = drizzle(client);

export { db };
