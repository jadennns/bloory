import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Channels from "./Channels";
import Modal from "react-overlays/Modal";
import styled from "styled-components";

const Backdrop = styled("div")`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #000;
  opacity: 0.5;
`;

// we use some pseudo random coords so nested modals
// don't sit right on top of each other.
const RandomlyPositionedModal = styled(Modal)`
  position: fixed;
  width: 400px;
  z-index: 1040;
  top: 50%;
  left: 50%;
  margin-top: -14rem;
  margin-left: -100px;
  background-color: #181a1c;
  border-radius: 0.375rem;
  padding: 20px;
`;

export default function Sidebar() {
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState<string>();

  const handleCreateChannel = () => {
    if (name) {
      fetch("/api/v1/channels/create", {
        method: "POST",
        body: JSON.stringify({
          name,
        }),
      });
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
      {openModal && (
        <RandomlyPositionedModal
          show={openModal}
          onHide={() => setOpenModal(false)}
          renderBackdrop={(props: any) => <Backdrop {...props} />}
          aria-labelledby='modal-label'
        >
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
            >
              Create
            </button>
          </div>
        </RandomlyPositionedModal>
      )}
    </>
  );
}
