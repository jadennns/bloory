import createChannel from "lib/controllers/createChannel";
import { withSessionRoute } from "lib/session";
import { io } from "socket.io-client";

const client = io(process.env.SOCKET_IO_CLIENT);

export default withSessionRoute(async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request" });

  const { name, author } = JSON.parse(req.body);

  if (!author || !name)
    return res.status(200).send({ message: "Bad body request" });

  const db = await createChannel(name, author);

  client.emit("CHANNEL_CREATE", db);

  res.status(200).send({ message: "Created channel", data: db });
});
