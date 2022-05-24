import { dbConnect } from "lib/mongodb";

export default async function getUserChannels(id: string) {
  const db = await dbConnect();
  const data = await db
    .collection("channels")
    .find({ members: id }, { projection: { _id: 0, __v: 0 } })
    .toArray();

  return data;
}
