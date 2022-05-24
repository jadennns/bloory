import Main from "components/pages/@me/Main";
import { withSessionSsr } from "lib/session";
import { userOnlyRoute } from "lib/ssr";

export default Main;

export const getServerSideProps = withSessionSsr(userOnlyRoute);
