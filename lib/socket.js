import { io } from 'socket.io-client';

const socket = io('https://chatify-project-backend.vercel.app', {
  withCredentials: true,
});

export default socket;
