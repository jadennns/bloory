import { sessionAuth } from "lib/sessionAuth";
import { getChannelMessages } from "../../../../../../lib/controllers/messages/getChannelMessages";
import createMessage from "lib/controllers/messages/createMessage";
import { withSessionRoute } from "lib/session";
import { ioConnect } from "lib/util/socketio";

const client = ioConnect();

export default withSessionRoute(async (req, res) => {
  sessionAuth(req, res);
  if (req.method == "POST") {
    const { content, channel_id, type } = JSON.parse(req.body);
    if (!content || !channel_id)
      return res.status(400).send({ message: "Bad body request" });

    const data = await createMessage({
      content,
      author: req.session.user.id,
      channel_id,
      type,
    });

    await fetch("/api/v1/socket");

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
