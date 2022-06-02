import Backdrop from "components/util/Backdrop";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Channels from "./Channels";

export default function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState<string>();
  const [clicked, setClicked] = useState(false);

  const handleCreateChannel = () => {
    if (name) {
      fetch("/api/v1/channels/create", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      }).then(() => setClicked(true));
    }
  };

  return (
    <>
      <div className='top-0 left-0 h-full w-[72px] flex flex-col space-y-2 bg-swatch-2'>
        <Link href={"/"}>
          <Image
            src={"/Logo.png"}
            width={80}
            height={80}
            className='rounded-md cursor-pointer'
            alt='Logo'
          />
        </Link>
        <hr className='border border-swatch-5 rounded-full mx-2' />
        <Channels />
        <hr className='border border-swatch-5 rounded-full mx-2' />
        <div
          className='sidebar-icon group'
          onClick={() => setOpenModal(!openModal)}
        >
          <div className='bg-swatch-1 text-white rounded-md shadow-xl px-2 py-2 trans-grow'>
            <AiOutlinePlus size={20} />
          </div>
          <span className='sidebar-tooltip group-hover:scale-100'>
            Create channel
          </span>
        </div>
      </div>
      <Backdrop open={openModal} setOpen={setOpenModal}>
        <div className='flex items-center flex-col space-y-6'>
          <div className='flex flex-col items-center space-y-2'>
            <p className='text-lg text-white font-semibold'>Channel Name</p>
            <input
              type='text'
              className='outline-none rounded-md px-1 py-1 bg-swatch-6 text-gray-300 placeholder:text-gray-300 w-[20rem]'
              placeholder='New channel name'
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <button
            className='rounded-full bg-white hover:bg-gray-200 px-4 py-1 text-black '
            onClick={handleCreateChannel}
            disabled={clicked}
          >
            Create
          </button>
        </div>
      </Backdrop>
    </>
  );
}
