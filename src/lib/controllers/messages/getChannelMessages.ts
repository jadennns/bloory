import { dbConnect } from "lib/mongodb";

export async function getChannelMessages(channel_id: string) {
  const db = await dbConnect();
  const data = await db
    .collection("messages")
    .aggregate([
      {
        $match: {
          channel_id,
        },
      },
      {
        $project: {
          _id: 0,
          __v: 0,
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "author",
          foreignField: "id",
          as: "author",
          pipeline: [{ $project: { _id: 0, __v: 0, password: 0, email: 0 } }],
        },
      },
      {
        $unwind: "$author",
      },
    ])
    .toArray();

  return data;
}
