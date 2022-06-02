import styled from "styled-components";
import Modal from "react-overlays/Modal";
import { Dispatch, ReactNode, SetStateAction } from "react";

const BackdropDiv = styled("div")`
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
const PositionedModal = styled(Modal)`
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

export default function Backdrop({
  children,
  open,
  setOpen,
}: {
  children: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <PositionedModal
      show={open}
      onHide={() => setOpen(false)}
      renderBackdrop={(props: any) => <BackdropDiv {...props} />}
      aria-labelledby='modal-label'
    >
      {children}
    </PositionedModal>
  );
}
