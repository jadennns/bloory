import Login from "components/pages/auth/Login";
import { withSessionSsr } from "lib/session";

export default Login;

export const getServerSideProps = withSessionSsr(async function NoUser({
  req,
}) {
  const { user } = req.session;
  if (user)
    return {
      redirect: {
        destination: "/app/@me",
        permanent: false,
      },
    };

  return {
    props: {},
  };
});
