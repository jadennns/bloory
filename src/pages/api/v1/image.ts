import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
import uniqid from "uniqid";

export default withSessionRoute(async (req, res) => {
  if (req.method != "POST")
    return res.status(400).send({ message: "Bad request" });

  if (!req.session.user) return res.status(401).send({ message: "Forbidden" });

  const { data } = JSON.parse(req.body);
  if (!data) return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();

  const uniqe = uniqid();

  await db.collection("cdn").insertOne({ data, id: uniqe });

  res.status(200).send({
    message: "Image created",
    data: { url: `${process.env.DOMAIN}/api/cdn/images/${uniqe}` },
  });
});
