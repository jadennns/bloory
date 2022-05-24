import createChannel from "lib/controllers/createChannel";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request" });

  if (!req.body.name)
    return res.status(200).send({ message: "Bad body request" });

  const db = await createChannel(req.body.name);

  res.status(200).send({ message: "Created channel", data: db });
});
