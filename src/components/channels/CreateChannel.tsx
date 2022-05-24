import Question from "components/pages/auth/Question";
import { useState } from "react";
import { toast } from "react-toastify";
import styles from "styles/sass/Animations.module.scss";
import { Channel, User } from "../../../@types/dts/user";

export default function CreateChannel({
  user,
  onAccept,
}: {
  user: User;
  onAccept: (data: Channel) => void;
}) {
  const [name, setName] = useState<string>();

  const handleCreate = () => {
    if (!name) return toast.warn("Please input a valid channel name");

    fetch("/api/v1/channels/create", {
      method: "POST",
      body: JSON.stringify({ name, author: user.id }),
    })
      .then((res) => res.json())
      .then(({ data }) => onAccept(data));
  };

  return (
    <div className={styles["slide-in"]}>
      <div className='bg-gray-800 px-3 py-2 rounded-md w-[45rem] flex flex-col items-center space-y-3 z-50 relative'>
        <div className='flex flex-col items-center space-y-1 '>
          <p className='text-base text-gray-100 font-semibold underline'>
            Channel Name
          </p>
          <input
            type={"text"}
            onChange={(e) => setName(e.target.value)}
            placeholder={"New channel name"}
            className='rounded-md bg-gray-100 outline-none px-1 py-1 w-[20rem]'
          />
        </div>
        <button
          className='rounded-md bg-indigo-600 hover:bg-indigo-700 text-white px-7  py-2'
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}
