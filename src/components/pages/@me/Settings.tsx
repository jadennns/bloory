import Title from "components/seo/Title";
import { useState } from "react";
import { toast } from "react-toastify";
import { User } from "../../../../@types/dts/user";
import SettingsDropzone from "./settings/SettingsDropzone";

export default function Settings({ user }: { user: User }) {
  const [avatar, setAvatar] = useState(user.avatar);
  const [username, setUsername] = useState(user.username);

  const handleSave = () => {
    if (username == user.username)
      return toast.error(
        "Username is the same with old username. Change to save settings.",
        {
          position: "top-right",
        }
      );

    if (avatar == user.avatar)
      return toast.error(
        "Avatar is the same with old avatar. Change to save settings.",
        {
          position: "top-right",
        }
      );

    fetch("/api/v1/cdn", {
      method: "POST",
      body: JSON.stringify({ data: avatar, user: user.id }),
    });
  };

  return (
    <>
      <Title title='Settings | @Me' />
      <div className='flex flex-col space-y-4 items-center justify-center mt-32'>
        <div className='flex items-center space-x-6'>
          <div className='border-4 border-indigo-600 rounded-full '>
            <SettingsDropzone dispatch={setAvatar} avatar={avatar} />
          </div>
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
      </div>
    </>
  );
}
