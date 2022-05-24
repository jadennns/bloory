import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (req.method != "POST")
    return res.status(400).send({ message: "Bad request" });

  const { email, password } = JSON.parse(req.body);
  if (!email || !password)
    return res.status(400).send({ message: "Bad body request" });

  const db = await dbConnect();
  const isExist = await db.collection("users").findOne({ email, password });

  if (!isExist)
    return res.status(404).send({ message: "Invalid email or password" });

  res.status(200).send({ message: "OK" });
});
