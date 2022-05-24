import { dbConnect } from "lib/mongodb";
import { generateId } from "lib/util/generator";

export default async function createChannel(name: string) {
  const options = {
    name,
    createdAt: new Date().toISOString(),
    id: generateId(),
    icon: "/api/cdn/1",
  };

  const db = await dbConnect();

  db.collection("channels").insertOne(options);

  return options;
}
