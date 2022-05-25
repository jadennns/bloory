import SignUp from "components/pages/auth/Signup";
import { withSessionSsr } from "lib/session";

export default SignUp;

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
