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
    ])
    .toArray();

  return data;
}
