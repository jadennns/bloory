import Title from "components/seo/Title";
import Footer from "components/ui/Footer/Footer";
import Navbar from "components/ui/Navbar/Navbar";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import styles from "styles/sass/Animations.module.scss";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (router.query.r) router.replace("/");
  }, [router]);

  return (
    <>
      <Title title='Home' />
      <Navbar
        buttons={[
          {
            name: "Open Bloory",
            link: "/app",
          },
        ]}
      />
      <div className='flex flex-col space-y-[10rem] items-center justify-center mt-14'>
        <div className='flex flex-col items-center space-y-3'>
          <h1 className='text-7xl text-white font-semibold'>Bloory</h1>
          <p className='text-gray-400 text-lg '>
            Bloory adalah aplikasi chatting dimana kalian bisa ngobrol dengan
            teman teman mu dari mana pun.
          </p>
        </div>
        <div className={styles["slide-in"]}>
          <div className='flex items-start space-x-5'>
            <Image
              src={"/home/Home1.png"}
              alt='Home 1'
              width={300}
              height={300}
            />
            <div className='flex flex-col items-start space-y-1'>
              <p className='text-lg text-white font-semibold'>Fast</p>
              <p className='text-base text-gray-400 w-[35rem]'>
                Bloory gives a fast service, and a reliable system. You can send
                messages quickly and the user on the other side can receive it
                in real time.
              </p>
            </div>
          </div>
        </div>
        <br />
      </div>
      <br />
      <Footer />
    </>
  );
}
