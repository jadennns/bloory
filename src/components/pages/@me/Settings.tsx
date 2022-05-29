import Title from "components/seo/Title";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../../../@types/dts/user";
import SettingsDropzone from "./settings/SettingsDropzone";

export default function Settings({ user }: { user: User }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    if (username == user.username && avatar == user.avatar)
      return toast.error("You need to make some changes to save.", {
        position: "top-right",
      });

    if (avatar != user.avatar) {
      fetch("/api/v1/cdn", {
        method: "POST",
        body: JSON.stringify({ data: avatar, user: user.id }),
      });
    }

    if (username != user.username) {
      fetch("/api/v1/@me/update", {
        method: "POST",
        body: JSON.stringify({ username }),
      });
    }

    return toast.success("Saved changes.", {
      position: "top-right",
    });
  };

  return (
    <>
      <Title title='Settings | @Me' />
      <div className='flex flex-col space-y-4 items-center justify-center mt-32'>
        <div className='flex items-center space-x-6'>
          <SettingsDropzone dispatch={setAvatar} avatar={avatar} />
          <div className='flex flex-col items-start space-y-1'>
            <p className='text-white text-xl font-semibold'>Username</p>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='outline-none bg-transparent text-white text-base border-2 border-amber-500 px-1 py-1'
            />
          </div>
        </div>
        <button
          className='rounded-md px-4 py-2 bg-green-600 hover:bg-green-700 text-white'
          onClick={handleSave}
        >
          Save Changes
        </button>
        <br />
        <div className='flex items-center space-x-3'>
          <Link href='/app/@me'>
            <button className='rounded-md px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white'>
              Home
            </button>
          </Link>
          <Link href='/api/v1/this/auth/destroy'>
            <button className='rounded-md px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white'>
              Logout
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}
