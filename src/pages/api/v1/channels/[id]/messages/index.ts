import createMessage from "lib/controllers/messages/createMessage";
import { getChannelMessages } from "lib/controllers/messages/getChannelmessages";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (req.method == "POST") {
    const { content, author, channel_id } = req.body;
    if (!content || !author || !channel_id)
      return res.status(400).send({ message: "Bad body request" });

    const data = await createMessage({ content, author, channel_id });

    res.status(200).send({ message: "Created message", data });
  }

  if (req.method == "GET") {
    const messages = await getChannelMessages(req.query.id as string);
    res.status(200).send(messages);
  }
});
