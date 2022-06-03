import Title from "components/seo/Title";
import Footer from "components/ui/Footer/Footer";
import Navbar from "components/ui/Navbar/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "styles/sass/Animations.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.r) router.replace("/");
  }, [router]);

  return (
    <div className='flex flex-col h-screen justify-between'>
      <Title title='Home' />
      <Navbar
        buttons={[
          {
            name: "Open Bloory",
            link: "/app",
          },
        ]}
      />
      <div className='flex flex-col space-y-[5rem] items-center justify-center mt-14'>
        <div className='flex flex-col items-center space-y-3'>
          <h1 className='text-7xl text-white font-semibold'>Bloory</h1>
          <p className='text-gray-400 text-lg '>
            Connecting more people from accros the world.
          </p>
          <br />
          <Link href={"/auth/signup"}>
            <button className='bg-blue-600 hover:bg-blue-700 rounded-full px-4 py-2 text-white '>
              Create an account!
            </button>
          </Link>
        </div>
        <div className={styles["slide-in"]}>
          <div className='border border-gray-100'>
            <Image
              src={"/home/Example.png"}
              alt='Example 1'
              width={"1024"}
              height={"524"}
            />
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
}
