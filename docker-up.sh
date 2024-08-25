#! /bin/sh
docker compose up --build --detach
cd server
PG_PORT=5435 pnpm run migrate
cd ..
