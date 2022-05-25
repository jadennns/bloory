import { withSessionRoute } from "lib/session";

export default withSessionRoute(async (req, res) => {
  if (!req.session.user) return res.status(401).send({ message: "Forbidden" });
  if (req.method !== "POST")
    return res.status(400).send({ message: "Bad request." });

  const {} = JSON.parse(req.body);
});
