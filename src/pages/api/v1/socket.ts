import { NextApiHandler } from "next";
import { Server } from "socket.io";

const ioHandler: NextApiHandler = (req, res) => {
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("MESSAGE_CREATE", (payload) => {
        socket.emit("MESSAGE_CREATE", payload);
      });

      socket.on("CHANNEL_CREATE", (payload) => {
        socket.emit("CHANNEL_CREATE", payload);
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
