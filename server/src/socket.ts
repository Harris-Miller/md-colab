import { Server } from 'socket.io';

import type { Server as HttpServer } from 'http';

import { logger } from './logger';

export const createSocketIO = (server: HttpServer) => {
  const io = new Server(server, {
    path: '/api',
  });

  io.on('connection', socket => {
    logger.info(`Socket.IO connected #${socket.id}`);

    socket.on('message', msg => {
      logger.info('Socket.IO Received Message');
      logger.info(msg);

      socket.emit('message', 'pong');
    });

    socket.onAny((eventName: string, ...args: object[]) => {
      logger.info('socket.onAny', eventName, ...args);
    });
  });

  return io;
};
