import { getChannelMessages } from "../../../../../../lib/controllers/messages/getChannelMessages";
import createMessage from "lib/controllers/messages/createMessage";
import { withSessionRoute } from "lib/session";
import { io } from "socket.io-client";

const client = io(process.env.SOCKET_IO_CLIENT);

export default withSessionRoute(async (req, res) => {
  if (req.method == "POST") {
    const { content, author, channel_id, type } = JSON.parse(req.body);
    if (!content || !author || !channel_id)
      return res.status(400).send({ message: "Bad body request" });

    const data = await createMessage({ content, author, channel_id, type });
    client.emit("MESSAGE_CREATE", {
      ...data,
      author: req.session.user,
    });

    res.status(200).send({ message: "Created message", data });
  }

  if (req.method == "GET") {
    const messages = await getChannelMessages(req.query.id as string);

    res.status(200).send(messages);
  }
});
