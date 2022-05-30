import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { BsFillGearFill, BsThreeDots } from "react-icons/bs";
import { FaUserSlash } from "react-icons/fa";
import styles from "styles/sass/Animations.module.scss";
import { User } from "../../../@types/dts/user";

export default function UserTab({ user }: { user: User }) {
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
        {open && <Dropdown />}
      </div>
    </div>
  );
}

function Dropdown() {
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
