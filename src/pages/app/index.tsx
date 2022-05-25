import Title from "components/seo/Title";
import { withSessionSsr } from "lib/session";
import { userOnlyRoute } from "lib/ssr";
import Image from "next/image";
import { useEffect } from "react";

export default function AppIndex() {
  useEffect(() => {
    setTimeout(() => location.replace("/app/@me"), 3000);
  }, []);

  return (
    <>
      <Title title='App' />
      <div className='flex flex-col space-y-4 items-center justify-center mt-32'>
        <Image
          src={"/gifs/Loading.gif"}
          alt='Loading Gif'
          width={256}
          height={256}
        />
        <p className='font-semibold text-4xl text-white'>Loading application</p>
      </div>
    </>
  );
}

export const getServerSideProps = withSessionSsr(userOnlyRoute);
