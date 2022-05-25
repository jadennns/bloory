import UserTab from "components/ui/User/UserTab";
import { useState } from "react";
import { User } from "../../../@types/dts/user";
import { MdCreateNewFolder } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import CreateChannel from "./CreateChannel";
import Channels from "./Channels";
import Link from "next/link";
import ReactTooltip from "react-tooltip";

interface Props {
  user: User;
}

export default function Sidebar({ user }: Props) {
  const [createChannelOpen, setCreateChannelOpen] = useState(false);
  const [channelTooltip, setChannelTooltip] = useState(false);

  return (
    <>
      <div className='md:flex flex-col md:flex-row md:min-h-screen '>
        <div className='flex flex-col w-full md:w-64 text-gray-500 bg-gray-800 flex-shrink-0'>
          <div className='flex-shrink-0 px-8 py-4 flex flex-col items-center space-y-6 justify-between'>
            <UserTab user={user} />
            <div className='flex items-center space-x-2'>
              <Link href={"/app/@me"}>
                <AiFillHome
                  className='text-primary-100 hover:text-primary-200 cursor-pointer'
                  size={40}
                />
              </Link>
              <MdCreateNewFolder
                className='text-accent hover:text-accent-hover cursor-pointer'
                size={50}
                onClick={() => setCreateChannelOpen(!createChannelOpen)}
                data-tip=''
                onMouseEnter={() => setChannelTooltip(true)}
                onMouseLeave={() => setChannelTooltip(false)}
              />
              {channelTooltip && (
                <ReactTooltip>
                  <p className='text-xs'>Create Channel</p>
                </ReactTooltip>
              )}
            </div>
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
