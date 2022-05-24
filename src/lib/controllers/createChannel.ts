import { dbConnect } from "lib/mongodb";
import { generateId } from "lib/util/generator";

export default async function createChannel(name: string, author: string) {
  const options = {
    name,
    createdAt: new Date().toISOString(),
    id: generateId(),
    icon: process.env.DOMAIN + "/_next/image?url=/cdn/1.png&w=128&q=78",
    members: [author],
  };

  const db = await dbConnect();

  db.collection("channels").insertOne(options);

  return options;
}
