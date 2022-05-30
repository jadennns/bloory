import { io } from "socket.io-client";

export function ioConnect() {
  return io("https://bloory-ws-version-production.up.railway.app/");
}
