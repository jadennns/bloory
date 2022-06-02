import createChannel from "lib/controllers/createChannel";
import { withSessionRoute } from "lib/session";
import { sessionAuth } from "lib/sessionAuth";
import { ioConnect } from "lib/util/socketio";

const socket = ioConnect();

export default withSessionRoute(async (req, res) => {
  sessionAuth(req, res);

  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request" });

  const { name, author } = JSON.parse(req.body);

  if (!name) return res.status(200).send({ message: "Bad body request" });

  const db = await createChannel(name, req.session.user.id);

  await fetch("/api/v1/socket");
  socket.emit("CHANNEL_CREATE", db);

  res.status(200).send({ message: "Created channel", data: db });
});
