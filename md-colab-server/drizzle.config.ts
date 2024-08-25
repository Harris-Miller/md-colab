import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dbCredentials: {
    url: 'postgres://postgres:postgres@localhost:5432/md_colab',
  },
  dialect: 'postgresql',
  out: './drizzle',
  schema: './src/schema.ts',
  strict: true,
  verbose: true,
});
