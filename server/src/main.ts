import cors from 'cors';
import { eq } from 'drizzle-orm';
import express from 'express';
import { Server } from 'socket.io';

import { createServer } from 'http';

import { db } from './dbClient';
import { logger } from './logger';
import { documents } from './schema';

const PORT = 3001;
const app = express();

logger.info('Starting express...');

app.use(cors());

// GET method route
app.get('/api', (req, res) => {
  logger.info('GET /api');

  db.select()
    .from(documents)
    .limit(1)
    .then(doc => {
      res.json(doc[0]);
    });
});

// POST method route
app.post('/api', express.json(), (req, res) => {
  logger.info('POST /api');
  logger.info(req.body);

  const { data } = req.body as { data: string };
  db.update(documents)
    .set({ body: data })
    .where(eq(documents.id, 1))
    .then(() => {
      res.status(202).json({ data: 'ok' });
    });
});

app.use((req, res, next) => {
  logger.info(`${req.method} /${req.path} - 404 not found`);

  res.status(404).json({ error: '404 not found' });
});

const server = createServer(app);

const io = new Server(server, {
  path: '/api',
});

io.on('connection', socket => {
  console.log('Socket.IO connected', socket.id);

  socket.on('message', msg => {
    logger.info('Socket.IO Received Message');
    logger.info(msg);

    socket.emit('message', 'pong');
  });

  socket.onAny((eventName: string, ...args: object[]) => {
    console.log('socket.onAny', eventName, ...args);
  });
});

server.listen(PORT, () => {
  logger.info(`Example app listening on port ${PORT}`);
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM signal received: closing HTTP server');
  server.close(() => {
    logger.info('HTTP server closed');
  });
});
