import UserTab from "components/ui/User/UserTab";
import { useState } from "react";
import { User } from "../../../@types/dts/user";
import { MdCreateNewFolder } from "react-icons/md";
import CreateChannel from "./CreateChannel";
import Channels from "./Channels";

interface Props {
  user: User;
}

export default function Sidebar({ user }: Props) {
  const [createChannelOpen, setCreateChannelOpen] = useState(false);

  return (
    <>
      <div className='md:flex flex-col md:flex-row md:min-h-screen '>
        <div className='flex flex-col w-full md:w-64 text-gray-500 bg-gray-800 flex-shrink-0'>
          <div className='flex-shrink-0 px-8 py-4 flex flex-col items-center space-y-6 justify-between'>
            <UserTab user={user} />
            <MdCreateNewFolder
              className='text-accent hover:text-accent-hover cursor-pointer'
              size={50}
              onClick={() => setCreateChannelOpen(!createChannelOpen)}
            />
            <Channels />
          </div>
        </div>
      </div>
      {createChannelOpen && (
        <div className='flex items-center justify-center mt-0'>
          <CreateChannel
            user={user}
            onAccept={(data) => {
              setCreateChannelOpen(false);
              setTimeout(
                () => location.replace("/app/@me/channels/" + data.id),
                2000
              );
            }}
          />
        </div>
      )}
    </>
  );
}
