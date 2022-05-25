import { dbConnect } from "lib/mongodb";
import { withSessionRoute } from "lib/session";
import sharp from "sharp";

export default withSessionRoute(async (req, res) => {
  const { id } = req.query;
  const db = await dbConnect();

  const data = await db.collection("cdn").findOne({ id });
  if (!data) return res.status(404).send("No image data");

  const img = Buffer.from(
    data.data.slice("data:image/png;base64,".length),
    "base64"
  );

  const validSizes = [32, 64, 128, 256, 512, 1024];
  if (
    req.query.size &&
    !validSizes.includes(parseInt(req.query.size as string))
  )
    return res.status(400).send("Invalid image size");

  sharp(img)
    .resize({
      width: parseInt(req.query.size as string) || 128,
      height: parseInt(req.query.size as string) || 128,
    })
    .toBuffer()
    .then((buffer) => {
      res.writeHead(200, {
        "Content-Type": "image/png",
        "Content-Length": buffer.length,
      });
      res.end(buffer);
    });
});
