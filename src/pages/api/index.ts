import { NextApiRequest, NextApiResponse } from "next";

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .send({ message: "API us running on : " + req.headers.origin });
};

export default handler;
