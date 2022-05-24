import { dbConnect } from "lib/mongodb";
import { generateId } from "lib/util/generator";

interface Props {
  content: string;
  author: string;
  channel_id: string;
}

export default async function createMessage({
  content,
  author,
  channel_id,
}: Props) {
  const db = await dbConnect();

  const options = {
    content,
    id: generateId(),
    author,
    channel_id,
    createdAt: new Date().toISOString(),
  };

  await db.collection("messages").insertOne(options);

  return options;
}
