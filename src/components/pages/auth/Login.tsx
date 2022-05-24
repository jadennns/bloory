import Title from "components/seo/Title";
import Navbar from "components/ui/Navbar/Navbar";
import Image from "next/image";
import { stringify } from "querystring";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "styles/sass/Animations.module.scss";
import Question from "./Question";

export default function Login() {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const handleLogin = () => {
    fetch("/api/v1/this/check/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.status !== 200) return toast.error("Invalid email or password");
      else {
        toast.success("Authenticated");
        fetch("/api/v1/this/auth/session", {
          method: "POST",
          body: JSON.stringify({ email, password }),
        });
        setTimeout(() => location.replace("/app"), 2000);
      }
    });
  };

  return (
    <>
      <Title title='Login' />
      <Navbar
        buttons={[
          {
            name: "Home",
            link: "/",
          },
        ]}
      />
      <div className={styles["slide-in"]}>
        <div className='flex items-center justify-center mt-0'>
          <div className='rounded-md bg-gray-800 px-2 py-2 flex flex-col items-center space-y-6 w-[25rem]'>
            <Question
              dispatch={setEmail}
              name='Email'
              placeholder='Enter your email address'
              type={"email"}
            />
            <Question
              dispatch={setPassword}
              name='Password'
              placeholder='Enter your password'
              type={"password"}
            />
            <button
              className='rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-7  py-2'
              onClick={handleLogin}
            >
              Login
            </button>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}
