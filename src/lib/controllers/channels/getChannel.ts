import { dbConnect } from "./../../mongodb";
export default async function getChannel(id: string) {
  const db = await dbConnect();
  const data = await db.collection("channels").findOne({ id });
  if (!data) return false;

  delete data.__v;

  // @ts-expect-error
  delete data._id;

  return data;
}
