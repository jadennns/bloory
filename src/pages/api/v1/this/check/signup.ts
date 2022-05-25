import { generateId } from "lib/util/generator";
import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (req.method != "POST")
    return res.status(400).send({ message: "Bad request" });

  const { email, password, username } = JSON.parse(req.body);
  if (!email || !password || !username)
    return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();
  const isExist = await db.collection("users").findOne({ email });
  if (isExist)
    return res
      .status(400)
      .send({ message: "A user already exist with that email." });

  await db.collection("users").insertOne({
    username,
    email,
    password,
    createdAt: new Date().toISOString(),
    id: generateId(),
    avatar: `${process.env.DOMAIN}/_next/image?url=/cdn/1.png&w=128&q=75`,
  });

  res.status(200).send({ message: "OK" });
});
