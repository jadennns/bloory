import getChannel from "lib/controllers/channels/getChannel";
import { withSessionRoute } from "lib/session";
export default withSessionRoute(async (req, res) => {
  if (req.method != "GET")
    return res.status(200).send({ message: "Bad request" });

  const channel = await getChannel(req.query.id as string);
  res.status(200).send(channel);
});
