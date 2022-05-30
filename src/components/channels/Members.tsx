import Image from "next/image";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { Channel, User } from "../../../@types/dts/user";
import { FaUserSlash, FaSave } from "react-icons/fa";
import { BsThreeDots, BsFillGearFill } from "react-icons/bs";
import Link from "next/link";
import styles from "styles/sass/Animations.module.scss";
import { AiOutlineCamera } from "react-icons/ai";
import { useDropzone } from "react-dropzone";

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
              <Image
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

function UserTab({ user }: { user: User }) {
  const [open, setOpen] = useState(false);

  var censorWord = function (str: string) {
    return str[0] + "*".repeat(str.length - 2) + str.slice(-1);
  };

  var censorEmail = function (email: string) {
    var arr = email.split("@");
    return censorWord(arr[0]) + "@" + censorWord(arr[1]);
  };

  return (
    <div className='flex items-start justify-between bg-swatch-5 py-4 px-5 w-[18rem]  rounded-md '>
      <div className='flex items-start space-x-4'>
        <Image
          src={user.avatar}
          width={52}
          height={52}
          className='rounded-md'
          alt={`${user.username} Avatar`}
        />
        <div className='flex flex-col items-start'>
          <p className='text-lg text-gray-100'>{user.username}</p>
          <p className='text-xs text-gray-400'>{censorEmail(user.email)}</p>
        </div>
      </div>
      <div className='select-none relative  space-y-2'>
        <BsThreeDots
          className='text-[#bfc0c4] '
          size={20}
          cursor={"pointer"}
          onClick={() => setOpen(!open)}
        />
        {open && <MembersDropdown />}
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
        <input {...getInputProps()} />
        <div className='relative  tab-container'>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Image
              src={data}
              alt={`${channel.name} Icon`}
              width={48}
              height={48}
              className='rounded-md cursor-pointer opacity-1 block w-[100%] h-auto img-over'
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
        <p className='text-gray-100 text-sm'>{channel.name}</p>
      </div>
      {changed && (
        <FaSave
          className='text-green-600 hover:text-green-700 cursor-pointer'
          size={20}
          onClick={() => {
            fetch(`/api/v1/channels/${router.query.id}/icon`, {
              method: "POST",
              body: JSON.stringify({ data }),
            }).then(() => {
              setTimeout(
                () => location.replace(`/app/@me/channels/${router.query.id}`),
                1500
              );
            });
          }}
        />
      )}
    </div>
  );
}

function MembersDropdown() {
  return (
    <div className={styles["growdown"]}>
      <div className='bg-swatch-2 rounded-md px-2 py-2 absolute z-50 left-auto right-0'>
        <div className='flex flex-col space-y-1'>
          <Link href={"/api/v1/this/auth/destroy"}>
            <div className='flex items-center space-x-3 text-rose-600 cursor-pointer hover:bg-rose-600 hover:text-white px-3 py-1 rounded-md text-base'>
              <FaUserSlash /> <p>Logout</p>
            </div>
          </Link>
          <Link href={"/app/@me/settings"}>
            <div className='flex items-center space-x-3 text-gray-100 cursor-pointer hover:bg-gray-600  px-3 py-1 rounded-md text-base'>
              <BsFillGearFill /> <p>Settings</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
