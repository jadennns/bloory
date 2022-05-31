import { io } from "socket.io-client";

export function ioConnect() {
  return io("https://ws-bloory.herokuapp.com/");
}
