import ChannelsMain from "components/pages/@me/channels/ChannelsMain";
import { withSessionSsr } from "lib/session";
import { userOnlyRoute } from "lib/ssr";

export default ChannelsMain;

export const getServerSideProps = withSessionSsr(async function ChannelRoute(
  ctx
) {
  const { user } = ctx.req.session;

  if (!user)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  const channel = await fetch(
    `${process.env.DOMAIN}/api/v1/channels/` + ctx.query.id
  ).then((res) => res.json());

  if (!channel)
    return {
      redirect: {
        destination: "/",
      },
      notFound: true,
    };

  if (!channel.members.includes(user.id))
    return {
      redirect: {
        destination: "/",
      },
      notFound: true,
    };
  return {
    props: { user, channel },
  };
});
