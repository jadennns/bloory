import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Channel, User } from "../../../@types/dts/user";
import UserTab from "components/users/UserTab";
import ChannelTab from "./ChannelTab";

export default function Members({
  user,
  channel,
}: {
  user: User;
  channel: Channel;
}) {
  const [members, setMembers] = useState<User[]>([]);

  const router = useRouter();

  useEffect(() => {
    fetch(`/api/v1/channels/${router.query.id}/members`)
      .then((res) => res.json())
      .then(setMembers);
  }, [router]);

  return (
    <div className='bg-swatch-3  h-screen w-[320px] '>
      <div className='flex items-center justify-center flex-col space-y-5 mt-6'>
        <UserTab user={user} />
        <div className='flex flex-col items-start space-y-2 h-[30rem] scrollbar-thin scrollbar-thumb-swatch-6'>
          {members.map((member, index) => (
            <div
              className='flex items-center space-x-3 border-swatch-5 border-2 rounded-md px-3 w-[15rem] py-2'
              key={index + 1}
            >
              <img
                src={member.avatar}
                alt={`${member.username} Username`}
                width={32}
                height={32}
                className='rounded-md relative'
              />
              <div className='flex flex-col items-start'>
                <p className='text-sm text-gray-100'>{member.username}</p>
                <p className='text-gray-400 text-xs'>{member.id}</p>
              </div>
            </div>
          ))}
        </div>
        <ChannelTab channel={channel} />
      </div>
    </div>
  );
}
