import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (!req.session.user) return res.status(401).send({ message: "Forbidden" });
  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request." });

  const { username } = JSON.parse(req.body);
  if (!username) return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();

  await db.collection("users").updateOne(
    { id: req.session.user.id },
    {
      $set: {
        username,
      },
    }
  );

  req.session.user = {
    ...req.session.user,
    username,
  };

  await req.session.save();

  res.status(200).send({ message: "Updated profile." });
});
