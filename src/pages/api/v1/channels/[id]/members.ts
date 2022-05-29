import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
export default withSessionRoute(async (req, res) => {
  if (!req.session.user)
    return res.status(401).send({ message: "Unauthorized" });

  if (req.method == "POST") {
    const db = await dbConnect();

    const data = await db.collection("channels").findOne({ id: req.query.id });
    if (!data) return res.status(404).send({ message: "Channel not found." });

    const { member } = JSON.parse(req.body);
    if (!member) return res.status(400).send({ message: "Bad body request." });

    const isUserExist = await db.collection("users").findOne({ id: member });
    if (!isUserExist)
      return res.status(404).send({ message: "That user does not exist" });

    if (data.members.includes(member))
      return res
        .status(400)
        .send({ message: "That user is already in the channel" });

    await db.collection("channels").updateOne(
      { id: req.query.id },
      {
        $push: {
          members: member,
        },
      }
    );

    res.status(200).send({ message: "Member added to ." + data.name });
  }

  if (req.method == "GET") {
    const db = await dbConnect();
    const [{ members }] = await db
      .collection("channels")
      .aggregate([
        {
          $match: {
            id: req.query.id,
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "members",
            foreignField: "id",
            as: "members",
            pipeline: [
              {
                $project: {
                  _id: 0,
                  email: 0,
                  password: 0,
                },
              },
            ],
          },
        },
      ])
      .toArray();

    res.status(200).send(members);
  }
});
