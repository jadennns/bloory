import getUserChannels from "lib/controllers/channels/getUserChannels";
import { withSessionRoute } from "lib/session";
export default withSessionRoute(async (req, res) => {
  if (!req.session.user) return res.status(401).send({ message: "Forbidden" });

  const channels = await getUserChannels(req.session.user.id);
  res.status(200).send(channels);
});
