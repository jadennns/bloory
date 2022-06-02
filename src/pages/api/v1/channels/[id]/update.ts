import { dbConnect } from "../../../../../lib/mongodb";
import { withSessionRoute } from "lib/session";
import { sessionAuth } from "lib/sessionAuth";
import { WithId } from "mongodb";

export default withSessionRoute(async (req, res) => {
  sessionAuth(req, res);

  if (req.method !== "PATCH")
    return res.status(400).send({ message: "Bad request." });

  const { id } = req.query;
  const { name } = JSON.parse(req.body);

  if (!name) return res.status(400).send({ message: "Bad body request." });

  const db = await dbConnect();

  const channel = await db.collection("channels").findOne({ id });
  if (!channel) return res.status(404).send({ message: "Channel not found" });

  console.log(channel);

  if (!channel.members.includes(req.session.user.id))
    return res.status(403).send({ message: "Unauthorized." });

  await db.collection("channels").updateOne(
    {
      id,
    },
    {
      $set: {
        name,
      },
    }
  );

  res.status(200).send({ message: "Channel updated." });
});
