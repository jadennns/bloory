import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
import { sessionAuth } from "lib/sessionAuth";
import { ioConnect } from "lib/util/socketio";

const io = ioConnect();

export default withSessionRoute(async (req, res) => {
  sessionAuth(req, res);

  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request" });

  const { data } = await JSON.parse(req.body);
  if (!data) return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();

  const channel = await db.collection("channels").findOne({ id: req.query.id });
  if (!channel) return res.status(404).send({ message: "Channel not found" });

  await db.collection("icons").insertOne({ data, id: req.query.id });
  await db.collection("channels").updateOne(
    { id: req.query.id },
    {
      $set: {
        icon: `${process.env.DOMAIN}/api/cdn/icons/${req.query.id}`,
      },
    }
  );

  res.status(200).send({
    message: "Icon updated.",
    data: { url: `${process.env.DOMAIN}/api/cdn/icons/${req.query.id}` },
  });
});
