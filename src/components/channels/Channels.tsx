import Link from "next/link";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Channel } from "../../../@types/dts/user";

const client = io("http://localhost:4000/");

export default function Channels() {
  const [channels, setChannels] = useState<Channel[]>([]);

  useEffect(() => {
    fetch("/api/v1/@me/channels")
      .then((res) => res.json())
      .then((data) => setChannels(data));
  }, []);

  useEffect(() => {
    client.on("connect", () =>
      console.log(`Listening for events : ${client.id}`)
    );

    client.on("CHANNEL_CREATE", (payload) =>
      setChannels([...channels, payload])
    );
  }, [channels]);

  return (
    <>
      <div className='flex flex-col space-y-2 items-center h-[28rem] scrollbar-thin scrollbar-thumb-amber-500'>
        {channels
          .sort((a, b) => {
            const nameA = a.name.toLowerCase(),
              nameB = b.name.toLowerCase();
            if (nameA < nameB)
              //sort string ascending
              return -1;
            if (nameA > nameB) return 1;
            return 0;
          })
          .map((channel, index) => (
            <Link href={"/app/@me/channels/" + channel.id} key={index + 1}>
              <div className='flex items-center space-x-2 hover:bg-gray-700 px-2 py-2 w-[15rem] rounded-md cursor-pointer'>
                <img
                  src={channel.icon}
                  alt={`${channel.name} Icon`}
                  width={42}
                  height={42}
                  className='rounded-full'
                />
                <p className='text-white text-base'>{channel.name}</p>
              </div>
            </Link>
          ))}
      </div>
    </>
  );
}
