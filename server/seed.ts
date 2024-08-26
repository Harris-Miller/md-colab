import { eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

import { documents } from './src/schema';

const PG_URL = 'postgres://postgres:postgres@localhost:5435/md_colab?sslmode=disable';

const client = new Client({
  connectionString: PG_URL,
});

await client.connect();
const db = drizzle(client);

const docs = await db.select().from(documents).where(eq(documents.id, 1));

if (docs.length === 0) {
  await db.insert(documents).values({
    body: '# Header 1',
    id: 1,
    name: 'Sample Doc',
  });
}

process.exit(0);
