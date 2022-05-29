import { io } from "socket.io-client";

const { SOCKET_URL } = process.env;

export function ioConnect() {
  return io("http://localhost:4000/");
}
