import { createServer } from 'node:http';

import { app } from './express';
import { logger } from './logger';
import { createSocketIO } from './socket';

const PORT = 3001;

const server = createServer(app);

createSocketIO(server);

server.listen(PORT, () => {
  logger.info(`Example app listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});
