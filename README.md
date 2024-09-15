
# Launch

docker-compose specifically runs with command overrides and `develop` for live-code changes. The Dockerfiles defaultly are set up for Prod use

`docker compose up --build --detach`

## db setup

from `./server` `PG_PORT=5435 bun run migrate && bun run seed.ts`

