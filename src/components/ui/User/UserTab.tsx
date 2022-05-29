import Image from "next/image";
import Link from "next/link";
import { User } from "../../../../@types/dts/user";

interface Props {
  user: User;
}

export default function UserTab({ user }: Props) {
  return (
    <div className='flex flex-col items-center space-y-4 '>
      <div className='flex items-center  space-x-2 '>
        <img
          src={user.avatar}
          alt={`${user.username} Avatar`}
          width={52}
          height={52}
          className='rounded-full'
        />
        <div className='flex flex-col items-start '>
          <p className='text-white text-base font-semibold'>{user.username}</p>
          <p className='text-xs text-gray-400'>{user.id}</p>
        </div>
      </div>
      <Link href={"/app/@me/settings"}>
        <button className='px-5 py-[0.5rem] rounded-full bg-indigo-600 hover:bg-indigo-700 text-sm text-white'>
          Settings
        </button>
      </Link>
    </div>
  );
}
