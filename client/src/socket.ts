import { io } from 'socket.io-client';

export const socket = io({
  path: '/api',
});

// client-side
socket.on('connect', () => {
  console.log(socket.id); // x8WIv7-mJelg7on_ALbx
});

socket.on('disconnect', () => {
  console.log(socket.id); // undefined
});

socket.on('message', (...msg) => {
  console.log('Socket.IO-Client received message');
  console.log(msg);
});
