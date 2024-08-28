import { Server } from 'socket.io';
import { YSocketIO } from 'y-socket.io/dist/server';

import type { Server as HttpServer } from 'http';

import { logger } from './logger';

export const createSocketIO = (server: HttpServer) => {
  const io = new Server(server, {
    path: '/api',
  });

  const ysocketio = new YSocketIO(io, {
    // authenticate: (auth) => auth.token === 'valid-token',
    // levelPersistenceDir: './storage-location',
    // gcEnabled: true,
  });

  // ysocketio.on('')

  // ysocketio.on('document-loaded', (doc: Document) => console.log(`The document ${doc.name} was loaded`))
  // ysocketio.on('document-update', (doc: Document, update: Uint8Array) => console.log(`The document ${doc.name} is updated`))
  // ysocketio.on('awareness-update', (doc: Document, update: Uint8Array) => console.log(`The awareness of the document ${doc.name} is updated`))
  // ysocketio.on('document-destroy', async (doc: Document) => console.log(`The document ${doc.name} is being destroyed`))
  // ysocketio.on('all-document-connections-closed', async (doc: Document) => console.log(`All clients of document ${doc.name} are disconected`))

  // Execute initialize method
  ysocketio.initialize();

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
