import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Channel, User } from "../../../@types/dts/user";
import { FaSave, FaDoorOpen, FaCopy } from "react-icons/fa";
import { AiOutlineCamera } from "react-icons/ai";
import { useDropzone } from "react-dropzone";
import UserTab from "components/users/UserTab";

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

function ChannelTab({ channel }: { channel: Channel }) {
  const [data, setData] = useState(channel.icon);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    setData(channel.icon);
  }, [channel]);

  const onDrop = useCallback(([file]: File[]) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      setData(reader.result as string);
      setChanged(true);
    };
  }, []);

  const { getInputProps, getRootProps } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: { "image/png": [".png", ".jpg", ".jpeg"] },
    maxSize: 8388608,
  });

  const router = useRouter();

  return (
    <div className='flex items-start justify-between bg-swatch-5 py-3 px-4 w-[18rem] rounded-md'>
      <div className='flex items-start space-x-4'>
        <div className='relative  tab-container'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <img
              src={data}
              alt={`${channel.name} Icon`}
              width={48}
              height={48}
              className='rounded-md  cursor-pointer opacity-1 block h-auto img-over'
            />
            <div className='middle opacity-0 absolute top-[50%] left-[50%]'>
              <AiOutlineCamera
                cursor={"pointer"}
                size={32}
                className='text-gray-300'
              />
            </div>
          </div>
        </div>
        <div className='flex flex-col space-y-1 items-start'>
          <p className='text-gray-100 text-sm'>{channel.name}</p>
          <div className='flex items-center space-x-2'>
            <FaDoorOpen
              size={24}
              className='text-rose-600 hover:text-rose-700'
              cursor={"pointer"}
            />
            <FaCopy
              size={18}
              className='text-gray-300 hover:text-gray-400'
              cursor={"pointer"}
              onClick={() => navigator.clipboard.writeText(channel.id)}
            />
          </div>
        </div>
      </div>
      {changed && (
        <FaSave
          className='text-green-600 hover:text-green-700 cursor-pointer'
          size={20}
          onClick={() => {
            fetch(`/api/v1/channels/${router.query.id}/icon`, {
              method: "POST",
              body: JSON.stringify({ data }),
            });

            setTimeout(() => {
              location.reload();
            }, 1000);
          }}
        />
      )}
    </div>
  );
}
