import ChannelsMain from "components/pages/@me/channels/ChannelsMain";
import { withSessionSsr } from "lib/session";
import { userOnlyRoute } from "lib/ssr";

export default ChannelsMain;

export const getServerSideProps = withSessionSsr(userOnlyRoute);
