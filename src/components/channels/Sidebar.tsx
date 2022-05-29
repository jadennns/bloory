import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Channels from "./Channels";
import Modal, { RenderModalBackdropProps } from "react-overlays/Modal";
import styled from "styled-components";

let rand = () => Math.floor(Math.random() * 20) - 10;

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
  top: ${() => 50 + rand()}%;
  left: ${() => 50 + rand()}%;
  border: 1px solid #e5e5e5;
  background-color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  padding: 20px;
`;

export default function Sidebar() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className='fixed top-0 left-0 h-screen w-[72px] flex flex-col space-y-1 bg-swatch-5'>
        <Link href={"/"}>
          <Image
            src={"/Logo.png"}
            width={80}
            height={80}
            className='rounded-md cursor-pointer'
            alt='Logo'
          />
        </Link>
        <hr className='border border-swatch-3 rounded-full mx-2' />
        <Channels />
        <hr className='border border-swatch-3 rounded-full mx-2' />
        <div
          className='sidebar-icon group'
          onClick={() => setOpenModal(!openModal)}
        >
          <div className='bg-swatch-7 text-white rounded-md shadow-xl px-2 py-2 trans-grow'>
            <AiOutlinePlus size={20} />
          </div>
          <span className='sidebar-tooltip group-hover:scale-100'>
            Create channel
          </span>
        </div>
      </div>
      <RandomlyPositionedModal
        show={openModal}
        onHide={() => setOpenModal(false)}
        renderBackdrop={(props: any) => <Backdrop {...props} />}
        aria-labelledby='modal-label'
      >
        <div>
          <h4 id='modal-label'>Text in a modal</h4>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
        </div>
      </RandomlyPositionedModal>
    </>
  );
}

// function Backdrop(props: RenderModalBackdropProps) {
//   return (
//     <div className='fixed z-[1040] top-0 bottom-0 left-0 right-0 bg-[#000] opacity-[0.5]'></div>
//   );
// }
