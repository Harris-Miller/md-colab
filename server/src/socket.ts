import { Server } from 'socket.io';
import * as Y from 'yjs';

import type { Server as HttpServer } from 'http';

import { bodyText, doc } from './crtd';
import { logger } from './logger';

export const createSocketIO = (server: HttpServer) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:80', 'http://localhost:3000'],
    },
    path: '/api',
  });

  io.on('connection', socket => {
    logger.info(`Socket.IO connected #${socket.id}`);

    socket.on('message', msg => {
      logger.info('Socket.IO Received Message');
      logger.info(msg);

      socket.emit('message', 'pong');
    });

    socket.on('sync-update', (update: Uint8Array) => {
      Y.applyUpdate(doc, update);
      logger.info('Updated Doc');
      logger.info(bodyText.toJSON());
    });

    socket.onAny((eventName: string, ...args: object[]) => {
      logger.info('socket.onAny', eventName, ...args);
    });
  });

  return io;
};
