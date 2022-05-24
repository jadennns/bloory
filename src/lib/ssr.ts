import { GetServerSidePropsContext } from "next";
import { withSessionSsr } from "./session";

export async function userOnlyRoute({ req }: GetServerSidePropsContext) {
  const { user } = req.session;

  if (!user)
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };

  return {
    props: { user },
  };
}
