import { NextApiRequest, NextApiResponse } from "next";

export function sessionAuth(req: NextApiRequest, res: NextApiResponse) {
  if (!req.session.user) {
    res.status(401).send({ message: "Forbidden" });
    res.end();
  }
}
