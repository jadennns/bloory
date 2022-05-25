import Settings from "components/pages/@me/Settings";
import { withSessionSsr } from "lib/session";
import { userOnlyRoute } from "lib/ssr";

export default Settings;

export const getServerSideProps = withSessionSsr(userOnlyRoute);
