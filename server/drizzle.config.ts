import { defineConfig } from 'drizzle-kit';

const PG_PORT = process.env.PG_PORT!;

export default defineConfig({
  dbCredentials: {
    url: `postgres://postgres:postgres@localhost:${PG_PORT}/md_colab`,
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schema.ts',
  strict: true,
  verbose: true,
});
