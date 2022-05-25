import { withSessionRoute } from "lib/session";
export default withSessionRoute(async (req, res) => {
  await req.session.destroy();
  res.redirect("/?r=true");
});
