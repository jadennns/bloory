import { ioConnect } from "lib/util/socketio";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Channel } from "../../../@types/dts/user";

const client = ioConnect();

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

    client.on("CHANNEL_CREATE", (payload) => {
      setChannels([...channels, payload]);

      setTimeout(() => {
        location.replace(`/app/@me/channels/${payload.id}`);
      }, 2000);
    });
  }, [channels]);

  return (
    <>
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
            <div className='sidebar-icon group shadow-xl trans-grow'>
              <Image
                src={channel.icon}
                alt={`${channel.name} Icon`}
                width={42}
                height={42}
                className='rounded-md'
              />
              <span className='sidebar-tooltip group-hover:scale-100'>
                {channel.name}
              </span>
            </div>
          </Link>
        ))}
    </>
  );
}
