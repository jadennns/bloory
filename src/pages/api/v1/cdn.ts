import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (req.method != "POST")
    return res.status(400).send({ message: "Bad request" });

  if (!req.session.user) return res.status(401).send({ message: "Forbidden" });

  const { data, user } = JSON.parse(req.body);

  const db = await dbConnect();
  const img = await db.collection("cdn").findOne({ user });

  const updateUserAvatar = async () => {
    await db
      .collection("users")
      .updateOne(
        { id: user },
        {
          $set: { avatar: `https://bloory-cdn.up.railway.app/avatars/${user}` },
        }
      );

    // @ts-expect-error
    req.session.user = {
      ...req.session.user,
      avatar: `https://bloory-cdn.up.railway.app/avatars/${user}`,
    };

    await req.session.save();
  };

  updateUserAvatar();

  if (!img) {
    await db.collection("cdn").insertOne({ data, user });
    return res.status(200).send({ message: "OK" });
  } else {
    await db.collection("cdn").updateOne({ user }, { $set: { data } });
    return res.status(200).send({ message: "OK" });
  }
});
