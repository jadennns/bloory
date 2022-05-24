import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
import { WithId } from "mongodb";
import { User } from "../../../../../../@types/dts/user";

export default withSessionRoute(async (req, res) => {
  if (req.method == "POST") {
    const { email, password } = JSON.parse(req.body);
    if (!email || !password)
      return res.status(400).send({ message: "Bad body request." });

    const db = await dbConnect();
    const userData = await db.collection("users").findOne({ email, password });

    // @ts-expect-error
    delete userData?._id;
    delete userData?.__v;

    req.session.user = userData as WithId<User>;

    await req.session.save();

    res.status(200).send(userData);
  } else if (req.method == "GET") {
    await req.session.destroy();
    res.redirect("/");
  }
});
