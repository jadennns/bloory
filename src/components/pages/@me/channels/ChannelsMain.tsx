import Sidebar from "components/channels/Sidebar";
import { User } from "../../../../../@types/dts/user";
import Messages from "./Messages";

export default function ChannelsMain({ user }: { user: User }) {
  return (
    <>
      <div className='absolute inset-y-0 left-0'>
        <Sidebar user={user} />
      </div>
      <Messages user={user} />
    </>
  );
}
