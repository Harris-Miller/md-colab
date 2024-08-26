#! /bin/sh
docker compose up --build --detach
cd server
PG_PORT=5435 bun run migrate
bun run seed.ts
cd ..
