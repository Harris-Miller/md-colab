import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const PG_URL = process.env.PG_URL!;

console.log('Connecting to postgres');
console.log(PG_URL);

const client = new Client({
  connectionString: PG_URL,
});

await client.connect();
const db = drizzle(client);

export { db };
