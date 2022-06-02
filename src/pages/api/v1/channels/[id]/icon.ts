import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
import { sessionAuth } from "lib/sessionAuth";

export default withSessionRoute(async (req, res) => {
  sessionAuth(req, res);

  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request" });

  const { data } = await JSON.parse(req.body);
  if (!data) return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();

  const channel = await db.collection("channels").findOne({ id: req.query.id });
  if (!channel) return res.status(404).send({ message: "Channel not found" });

  const icon = await db.collection("icons").findOne({ id: req.query.id });

  !icon
    ? await db.collection("icons").insertOne({ data, id: req.query.id })
    : await db.collection("icons").updateOne(
        { id: req.query.id },
        {
          $set: {
            data,
          },
        }
      );

  await db.collection("channels").updateOne(
    { id: req.query.id },
    {
      $set: {
        icon: `https://bloory-cdn.up.railway.app/icons/${req.query.id}`,
      },
    }
  );

  res.status(200).send({
    message: "Icon updated.",
    data: { url: `https://bloory-cdn.up.railway.app/icons/${req.query.id}` },
  });
});
